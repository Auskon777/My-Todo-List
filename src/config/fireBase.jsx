import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyARgmzaxhu42FZr15AqtIVi6X3SivyeJf8",
  authDomain: "todo-list-b4bb7.firebaseapp.com",
  projectId: "todo-list-b4bb7",
  storageBucket: "todo-list-b4bb7.appspot.com",
  messagingSenderId: "667613018202",
  appId: "1:667613018202:web:5b8f079da8ddf2b3d60063",
  measurementId: "G-SCJJ6V7TJ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
