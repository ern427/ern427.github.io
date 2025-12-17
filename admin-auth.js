import { auth, provider } from "./firebase.js";
import { signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginBtn = document.getElementById("googleLogin");

if (loginBtn) {
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
    document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh">
        <button id="googleLogin">Google ile Giriş</button>
      </div>
    `;
  }
});


