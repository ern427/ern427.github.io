import { db } from "./firebase.js";
import { doc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

function render(data) {
  // status + announcement
  const statusEl = document.getElementById("statusText");
  const annEl = document.getElementById("announcementText");

  const st = (data.status ?? "OFFLINE").toUpperCase();

  if (statusEl) {
    statusEl.textContent = `Durum: ${st}`;
    const isOnline = st === "ONLINE";
    statusEl.style.background = isOnline
      ? "linear-gradient(135deg,#00ff99,#00cc66)"
      : "#ff4d4d";
    statusEl.style.color = "#fff";
    statusEl.classList.toggle("is-online", isOnline);
  }

  if (annEl) annEl.textContent = data.announcement ?? "";

  // links
  const linksWrap = document.getElementById("links");
  if (linksWrap) {
    linksWrap.innerHTML = "";
    (data.links ?? []).forEach((l) => {
      const a = document.createElement("a");
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "link-btn"; // sende varsa güzel durur
      a.textContent = l.label;
      linksWrap.appendChild(a);
    });
  }
}

// Firestore: site/config
const ref = doc(db, "site", "config");

// canlı dinle (değişince anında güncellensin)
onSnapshot(ref, (snap) => {
  if (snap.exists()) render(snap.data());
  else console.error("Firestore site/config bulunamadı");
});

