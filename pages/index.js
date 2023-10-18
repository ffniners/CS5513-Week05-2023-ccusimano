import Link from 'next/link';
import db from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export default function Home({ persons }) {
    return (
        <div>
            <h1>List of People</h1>
            <ul>
                {persons && persons.map(person => (
                    <li key={person.id}>
                        <Link href={`/person/${person.id}`}>
                             {person.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
    const peopleCol = collection(db, 'persons');
    const peopleSnapshot = await getDocs(peopleCol);
    const persons = peopleSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return {
        props: {
            persons
        },
        revalidate: 10
    };
}
