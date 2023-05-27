// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5f3TtTcNH9Mbg02QLYd_ZaPNDXwk-2SQ",
  authDomain: "restaurantsfinder-bee4c.firebaseapp.com",
  projectId: "restaurantsfinder-bee4c",
  storageBucket: "restaurantsfinder-bee4c.appspot.com",
  messagingSenderId: "722510014400",
  appId: "1:722510014400:web:6db08a2000f13ffe0b0a25",
  measurementId: "G-057W5PM31D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
