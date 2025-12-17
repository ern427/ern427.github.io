// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDRRQdUh-lw-dSGdKeNswZHaZ5tcOld0",
  authDomain: "ern4-site.firebaseapp.com",
  projectId: "ern4-site",
  storageBucket: "ern4-site.firebasestorage.app",
  messagingSenderId: "169213127920",
  appId: "1:169213127920:web:534afce822a4fe85706635"
};

// Init
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
