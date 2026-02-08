// config/firebase.ts
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClvTI6mmt-s1xe7RmUBaEEntyJZdWGaA0",
  authDomain: "xivia-store.firebaseapp.com",
  projectId: "xivia-store",
  storageBucket: "xivia-store.appspot.com", 
  messagingSenderId: "791194468291",
  appId: "1:791194468291:web:638ffa1f8ec164ceec0776",
  measurementId: "G-1PZPZCD2E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export { analytics };

export default app;
