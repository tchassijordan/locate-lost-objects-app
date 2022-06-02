// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzKz45kKVmI2z4eQLuvo6_Fitq9-4qdak",
  authDomain: "locateauth.firebaseapp.com",
  projectId: "locateauth",
  storageBucket: "locateauth.appspot.com",
  messagingSenderId: "647797316650",
  appId: "1:647797316650:web:6e1197884608dc3ac93753",
  measurementId: "G-CWL23Y3LCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);

export default app