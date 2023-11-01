import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAo5c6VdjWX9Dy44Hs91W-TnO65kEoQRUk",
  authDomain: "productos-ropa.firebaseapp.com",
  projectId: "productos-ropa",
  storageBucket: "productos-ropa.appspot.com",
  messagingSenderId: "522743447138",
  appId: "1:522743447138:web:70df1d39d6312e4b9d1b3b"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);

const auth = getAuth(App);
const fs = getFirestore(App);
const storage = getStorage(App);

export {auth, fs, storage, App}
