import { auth, provider } from "./firebase.js";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginBtn = document.getElementById("googleLoginBtn");
const loginBox = document.getElementById("loginBox");
const adminPanel = document.getElementById("adminPanel");

// 🔴 SAYFA AÇILIR AÇILMAZ ÇIKIŞ YAPTIR
signOut(auth).catch(() => {});

// Google ile giriş
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
});

// Auth kontrolü
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ SADECE BUTONA BASIP GİRİNCE BURAYA GELİR
    loginBox.style.display = "none";
    adminPanel.style.display = "block";
  } else {
    loginBox.style.display = "block";
    adminPanel.style.display = "none";
  }
});
