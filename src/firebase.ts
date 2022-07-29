import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
export const imagesDB = getStorage(app);

export default app;
