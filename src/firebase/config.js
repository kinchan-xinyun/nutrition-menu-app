// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkTHmx9WH-jGrztPlBlgDlu7cFmpgVE2c",
  authDomain: "menu-calorie-calculator-6934f.firebaseapp.com",
  databaseURL: "https://menu-calorie-calculator-6934f-default-rtdb.firebaseio.com",
  projectId: "menu-calorie-calculator-6934f",
  storageBucket: "menu-calorie-calculator-6934f.firebasestorage.app",
  messagingSenderId: "1000754816280",
  appId: "1:1000754816280:web:2880cc9704c3f6339d6a6d",
  measurementId: "G-6FBMLPWRVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;