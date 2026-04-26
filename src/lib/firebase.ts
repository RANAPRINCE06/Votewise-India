import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBiFqxNmRGSImfM5g-orJ--WwobFxiVS2A",
  authDomain: "votewise-india-8a264.firebaseapp.com",
  databaseURL: "https://votewise-india-8a264-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "votewise-india-8a264",
  storageBucket: "votewise-india-8a264.firebasestorage.app",
  messagingSenderId: "969427309445",
  appId: "1:969427309445:web:c74492e78d93e2a06b6aec",
  measurementId: "G-5BSWMPJVY2"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
