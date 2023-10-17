import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB-5Tk60hliGQ8iU6_kgro7fcCVzLF9YU",
  authDomain: "ecommerceropa-c09cb.firebaseapp.com",
  projectId: "ecommerceropa-c09cb",
  storageBucket: "ecommerceropa-c09cb.appspot.com",
  messagingSenderId: "596634183078",
  appId: "1:596634183078:web:de2279b9f30a98de679b67",
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);

const auth = getAuth(App);
const db = getFirestore(App);
const storage = getStorage(App);

export { auth, db, storage, App };
