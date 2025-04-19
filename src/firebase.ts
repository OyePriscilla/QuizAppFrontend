// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-OjJ8u8oiRJG19oEl3IM3TOhL6kcWnNw",
  authDomain: "quizdb-19952.firebaseapp.com",
  projectId: "quizdb-19952",
  storageBucket: "quizdb-19952.firebasestorage.app",
  messagingSenderId: "510711448818",
  appId: "1:510711448818:web:418c57255477cfe2fe7c6b",
  measurementId: "G-ZTP2RFN0H6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// @ts-ignore
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);