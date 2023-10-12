
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/app'
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoOFmt8v12ZL-nPaOW4456GfzAPYIUu3I",
  authDomain: "lostfound-4d06a.firebaseapp.com",
  projectId: "lostfound-4d06a",
  storageBucket: "lostfound-4d06a.appspot.com",
  messagingSenderId: "684924804201",
  appId: "1:684924804201:web:6050027a93340a764bd6f8"
};



const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider= new GoogleAuthProvider()
const db=getFirestore(app);
export const imageDb = getStorage(app)
export default auth;
export {provider,db}
