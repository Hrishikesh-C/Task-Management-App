// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "realtime-taskmanager.firebaseapp.com",
  projectId: "realtime-taskmanager",
  storageBucket: "realtime-taskmanager.firebasestorage.app",
  messagingSenderId: "579622749906",
  appId: "1:579622749906:web:bfb58249efe69eedeccf0b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);