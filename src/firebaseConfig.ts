import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmuct8NiAXCXvKvkZwNie8rp3RJl49kaU",
  authDomain: "scissor-36167.firebaseapp.com",
  projectId: "scissor-36167",
  storageBucket: "scissor-36167.appspot.com",
  messagingSenderId: "1066372952953",
  appId: "1:1066372952953:web:98c0e4454d317fee89f5a8",
  measurementId: "G-ERZWZNCBLM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Initialize Analytics
const analytics = getAnalytics(firebaseApp);

export { db, analytics, logEvent, firebaseApp };
