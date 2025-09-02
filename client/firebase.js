// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoIzYpUKyWoXduR20Bxe9LAi7LUTAhuXY",
  authDomain: "fir-36c94.firebaseapp.com",
  projectId: "fir-36c94",
  storageBucket: "fir-36c94.firebasestorage.app",
  messagingSenderId: "1003827099960",
  appId: "1:1003827099960:web:2262f31316d678614c29cd",
  measurementId: "G-93KGB6L8HR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
