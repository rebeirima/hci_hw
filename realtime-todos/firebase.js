import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyA5rEZ1NflwNlfkzHURN3J93VZ2-UEMTkI",
  authDomain: "todo-app-aec21.firebaseapp.com",
  projectId: "todo-app-aec21",
  storageBucket: "todo-app-aec21.appspot.com",
  messagingSenderId: "367089720125",
  appId: "1:367089720125:web:0d7f464e54e46afba48354",
  measurementId: "G-ZH4BWMB0Q0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
  
export const db = firebase.firestore();

