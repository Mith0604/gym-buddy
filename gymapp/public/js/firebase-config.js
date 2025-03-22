// firebase-config.js

// Your Firebase configuration (copy/paste your provided values)
const firebaseConfig = {
  apiKey: "AIzaSyCMFc6DsxT5SDv9jhAC9mg3LygNmjN7FPc",
  authDomain: "gym-management-9f7ca.firebaseapp.com",
  projectId: "gym-management-9f7ca",
  storageBucket: "gym-management-9f7ca.firebasestorage.app",
  messagingSenderId: "513873597591",
  appId: "1:513873597591:web:21f4ba16f8775f586c45d2",
  measurementId: "G-SLC4ZBW3HX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create global variables for auth and Firestore database
const auth = firebase.auth();
const db = firebase.firestore();