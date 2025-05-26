import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; //  authentication
import { getStorage } from "firebase/storage"; //  need storage

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim(),
};

if (!firebaseConfig.projectId) {
  console.error(
    "Firebase projectId is not loaded. Check your .env file and VITE_FIREBASE_PROJECT_ID variable."
  );
  // You might want to throw an error here or handle it appropriately
  // to prevent the app from trying to initialize Firebase with a missing projectId
} else {
  console.log("Firebase Project ID loaded:", firebaseConfig.projectId); // For debugging
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// const auth = getAuth(app); // If using authentication
const storage = getStorage(app); // If using storage

export { db, storage /*, auth,  */ };
