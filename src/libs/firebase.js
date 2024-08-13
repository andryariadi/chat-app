import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatify-cc8ff.firebaseapp.com",
  projectId: "chatify-cc8ff",
  storageBucket: "chatify-cc8ff.appspot.com",
  messagingSenderId: "551885876151",
  appId: "1:551885876151:web:9972ab792b48e61d625632",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
