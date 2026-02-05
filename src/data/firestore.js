import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqsqDPI0EAZcE3e5S4go5JOkyohpCpzdY",
  authDomain: "proyectofinal-ad65c.firebaseapp.com",
  projectId: "proyectofinal-ad65c",
  storageBucket: "proyectofinal-ad65c.firebasestorage.app",
  messagingSenderId: "577579317571",
  appId: "1:577579317571:web:52ec814c1982b1936457f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);