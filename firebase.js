// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsdhIWy2gdj1IZChTM-P7UyMfz0LfQnMY",
  authDomain: "store-1da5f.firebaseapp.com",
  projectId: "store-1da5f",
  storageBucket: "store-1da5f.appspot.com",
  messagingSenderId: "961740225897",
  appId: "1:961740225897:web:cb5fdb71b43340fd6a51f8",
  measurementId: "G-GXJ3JKP0WS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
