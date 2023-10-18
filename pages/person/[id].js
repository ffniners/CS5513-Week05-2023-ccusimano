import db from '../../firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';

export default function PersonDetails({ person, family }) {
    return (
        <div>
            <h1>{person.name}</h1>
          <ul>
            <li>{person.birthdate}</li>
            <li>{person.email}</li>
            <li>{person.phone}</li>
          
          </ul>
            <h2>Family:</h2>
            <ul>
                {family.map(relative => (
                    <li key={relative.id}>
                        <ul> 
                       <li>{relative.name}</li>
                      <li>{relative.birthday}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticPaths() {
    const peopleCol = collection(db, 'persons');
    const peopleSnapshot = await getDocs(peopleCol);
    const paths = peopleSnapshot.docs.map(doc => ({
        params: { id: doc.id }
    }));

    return {
        paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const personDocRef = doc(db, 'persons', params.id);
    const personDocSnapshot = await getDoc(personDocRef);

 if (!personDocSnapshot.exists) {
      return {
         notFound: true,
       };
    }

   const personData = personDocSnapshot.data();

   let familyMembers = [];

  if (personData.related && personData.related.length > 0) {
                                
  const familyCol = collection(db, 'family');
  const familyQuery = query(familyCol, where('__name__', 'in', personData.related));
                                 const familySnapshot = await getDocs(familyQuery);
                                 familyMembers = familySnapshot.docs.map(doc => ({
                                     id: doc.id,
                                     ...doc.data()
                                 }));
                             }

                             return {
                                 props: {
                                     person: {
                                         id: personDocSnapshot.id,
                                         ...personData
                                     },
                                     family: familyMembers
                                 },
                                 revalidate: 10
                             };
                             }


