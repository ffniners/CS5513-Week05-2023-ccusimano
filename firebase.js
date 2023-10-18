
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyArJxpFQiyTj3feusP73eBUXVFG09qarTI",
  authDomain: "cs55a6.firebaseapp.com",
  projectId: "cs55a6",
  storageBucket: "cs55a6.appspot.com",
  messagingSenderId: "915441349666",
  appId: "1:915441349666:web:a15bde572c10fec423c67b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;