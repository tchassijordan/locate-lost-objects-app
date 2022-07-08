// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA9k4glGuqgxd-tNHRx8-MHIQ8ysN7sv9E',
  authDomain: 'locate-server.firebaseapp.com',
  projectId: 'locate-server',
  storageBucket: 'locate-server.appspot.com',
  messagingSenderId: '796873007917',
  appId: '1:796873007917:web:46c338834ea45627bc69a4',
  measurementId: 'G-CZ2CVWN4WH'
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDB = getFirestore(app);

export default app;
