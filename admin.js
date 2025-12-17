import { auth, db } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Basit UI ekle (admin.html içine buton koymadıysan otomatik ekler)
function ensureAuthUI() {
  let wrap = document.getElementById("authBox");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "authBox";
    wrap.style.display = "flex";
    wrap.style.gap = "10px";
    wrap.style.margin = "10px 0";
    wrap.innerHTML = `
      <button id="loginBtn" type="button">Google ile Giriş</button>
      <button id="logoutBtn" type="button" style="display:none;">Çıkış</button>
      <span id="who" style="opacity:.8;"></span>
    `;
    document.body.prepend(wrap);
  }
  return wrap;
}

const ui = ensureAuthUI();
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const who = document.getElementById("who");

loginBtn.onclick = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

logoutBtn.onclick = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    who.textContent = user.email ?? user.uid;
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    who.textContent = "";
  }
});

// Kaydetme: admin panelindeki alanları Firestore'a yaz
const saveBtn = document.getElementById("saveBtn"); // aşağıda admin.html'e ekleyeceğiz
if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    if (!auth.currentUser) {
      alert("Önce Google ile giriş yap.");
      return;
    }

    const title = document.getElementById("siteTitle").value.trim();
    const status = document.getElementById("siteStatus").value;
    const announcement = document.getElementById("siteAnnouncement").value.trim();

    // link listesi (admin panelinde senin mevcut link ekleme mantığın varsa onu bağlarız)
    // Şimdilik: textarea üzerinden JSON array bekleyelim:
    let links = [];
    const linksJson = document.getElementById("linksJson").value.trim();
    if (linksJson) links = JSON.parse(linksJson);

    await setDoc(doc(db, "site", "config"), { title, status, announcement, links }, { merge: true });
    alert("Kaydedildi ✅ (site anında güncellenir)");
  });
}
