fetch("data.json")
  .then(res => res.json())
  .then(data => {
    // === ELEMENTLER ===
    const titleEl = document.getElementById("siteTitleText");
    const announcementEl = document.getElementById("announcementText");
    const linksEl = document.getElementById("links");
    const statusBox = document.getElementById("liveStatusBox");
    const statusText = document.getElementById("liveStatusText");

    // === BAŞLIK ===
    if (titleEl && data.title) {
      titleEl.textContent = data.title;
    }

    // === DUYURU ===
    if (announcementEl && data.announcement) {
      announcementEl.textContent = data.announcement;
    }

    // === ONLINE / OFFLINE ===
    if (data.status) {
      statusBox.style.display = "block";

      if (data.status === "ONLINE") {
        statusBox.style.background = "#2ecc71";
        statusText.textContent = "🟢 ONLINE";
      } else {
        statusBox.style.background = "#e74c3c";
        statusText.textContent = "🔴 OFFLINE";
      }
    }

    // === LİNKLER ===
    linksEl.innerHTML = "";
    if (Array.isArray(data.links)) {
      data.links.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.textContent = link.label;
        a.className = "btn-kick";
        linksEl.appendChild(a);
      });
    }
  })
  .catch(err => {
    console.error("data.json okunamadı:", err);
  });
