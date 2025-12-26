// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACMVqooq_nGbVbGYXsl9Mbp-TfDtny268",
  authDomain: "drugly-215ad.firebaseapp.com",
  projectId: "drugly-215ad",
  storageBucket: "drugly-215ad.firebasestorage.app",
  messagingSenderId: "384458881651",
  appId: "1:384458881651:web:9a88f7ba47eb0d334ac806",
  measurementId: "G-JGFE29HDY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const database = getFirestore(app)

const auth = getAuth()
export{database, auth,analytics}