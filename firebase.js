import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "BURAYA_YENİ_KOPYALADIĞIN_API_KEY",
  authDomain: "ern4-site.firebaseapp.com",
  projectId: "ern4-site",
  storageBucket: "ern4-site.appspot.com",
  messagingSenderId: "XXXX",
  appId: "1:XXXX:web:XXXX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

