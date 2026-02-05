import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6VFFJESRULx0hg6WEpQvoeWHSK4vjMXs",
  authDomain: "book-67fc6.firebaseapp.com",
  projectId: "book-67fc6",
  storageBucket: "book-67fc6.firebasestorage.app",
  messagingSenderId: "124826664880",
  appId: "1:124826664880:web:effcc316b772a3b0a86075",
  measurementId: "G-PG7DYV4W11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
export const analytics = getAnalytics(app);

// Export Authentication and Firestore services for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);