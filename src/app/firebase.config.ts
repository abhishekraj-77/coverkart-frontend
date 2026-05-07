// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUCGcd2hjjuHqUqZllLC2PLPylUdjHxyE",
  authDomain: "coverkart-f8d81.firebaseapp.com",
  projectId: "coverkart-f8d81",
  storageBucket: "coverkart-f8d81.firebasestorage.app",
  messagingSenderId: "233673387415",
  appId: "1:233673387415:web:d68dbaf651e9e53a69e8d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);