import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:"AIzaSyDUCGcd2hjjuHqUqZllLC2PLPylUdjHxyE",
  authDomain: "coverkart-f8d81.firebaseapp.com",
  projectId: "coverkart-f8d81",
  storageBucket: "coverkart-f8d81.firebasestorage.app",
  messagingSenderId: "233673387415",
  appId: "1:233673387415:web:d68dbaf651e9e53a69e8d2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);