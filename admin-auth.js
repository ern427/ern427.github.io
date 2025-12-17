import { auth, provider } from "./firebase.js";
import {
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

function renderLogin() {
  document.body.innerHTML = `
    <div style="
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      flex-direction:column;
      gap:12px;
    ">
      <h2>Admin Giriş</h2>
      <button id="googleLogin">Google ile Giriş</button>
    </div>
  `;

  // 🔴 KRİTİK: Buton OLUSTUKTAN SONRA bağlanıyor
  const loginBtn = document.getElementById("googleLogin");

  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    renderLogin();
  } else {
    console.log("Giriş yapıldı:", user.email);
    // Burada admin paneli normal şekilde çalışır
  }
});
