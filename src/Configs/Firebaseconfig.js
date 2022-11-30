// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAVzJhPKnrsnx4498myeOLOf9e3lgMQRc",
  authDomain: "halifaxfoodie-364105.firebaseapp.com",
  projectId: "halifaxfoodie-364105",
  storageBucket: "halifaxfoodie-364105.appspot.com",
  messagingSenderId: "1035420212945",
  appId: "1:1035420212945:web:01e90ffbe1a506d1e86ff0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default { db, auth }