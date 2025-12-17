// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDRRQRdUh-Iw-dSGdKeNsvWZHaZ5tcOId0",
  authDomain: "ern4-site.firebaseapp.com",
  projectId: "ern4-site",
  storageBucket: "ern4-site.appspot.com",
  messagingSenderId: "169213127920",
  appId: "1:169213127920:web:534afce822a4fe85706635"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


