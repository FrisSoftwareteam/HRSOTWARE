// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// Create Firebase project and get the following details
const firebaseConfig = {
  apiKey: "AIzaSyDAVX0z9IIa1gNx8ozWgoR54FQE6bZTMoA",
  authDomain: "fris-appraisal.firebaseapp.com",
  projectId: "fris-appraisal",
  storageBucket: "fris-appraisal.firebasestorage.app",
  messagingSenderId: "314480145225",
  appId: "1:314480145225:web:63c5e0c761a9650c376098",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

//console.log(firebaseConfig);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const micrsoftAuthProvider = new firebase.auth.OAuthProvider("microsoft.com");

export { app, auth, micrsoftAuthProvider };
