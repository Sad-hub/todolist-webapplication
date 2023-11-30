import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyD2ucNTMJGG3OtmXWAh-5E254D9LWp6K-U",
  authDomain: "todo-app-7beb5.firebaseapp.com",
  projectId: "todo-app-7beb5",
  storageBucket: "todo-app-7beb5.appspot.com",
  messagingSenderId: "718419239568",
  appId: "1:718419239568:web:22f5098051811c18c56e15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);



export {app, db};

