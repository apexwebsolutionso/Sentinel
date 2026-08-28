import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAfNUc8ecApn8bc_OJ4M-4cIwIot5Jvk6Q",
  authDomain: "sentinel-b6d47.firebaseapp.com",
  projectId: "sentinel-b6d47",
  storageBucket: "sentinel-b6d47.firebasestorage.app",
  messagingSenderId: "41211352480",
  appId: "1:41211352480:android:7355e9e8ca36f60878c0c5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);