const links = [];
const commands = [];

const el = (id) => document.getElementById(id);

function renderList(listEl, items, formatFn) {
  listEl.innerHTML = "";
  items.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${formatFn(item)} <button data-i="${i}" style="margin-left:10px;">Sil</button>`;
    li.querySelector("button").addEventListener("click", (e) => {
      const idx = Number(e.target.getAttribute("data-i"));
      items.splice(idx, 1);
      refresh();
    });
    listEl.appendChild(li);
  });
}

function refresh() {
  renderList(el("linksList"), links, (l) => `<b>${l.label}</b> → ${l.url}`);
  renderList(el("cmdsList"), commands, (c) => `<b>${c.cmd}</b> → ${c.text}`);
}

el("addLinkBtn").addEventListener("click", () => {
  const label = el("linkLabel").value.trim();
  const url = el("linkUrl").value.trim();
  if (!label || !url) return alert("Label ve URL boş olamaz.");

  links.push({ label, url });
  el("linkLabel").value = "";
  el("linkUrl").value = "";
  refresh();
});

el("clearLinksBtn").addEventListener("click", () => {
  links.length = 0;
  refresh();
});

el("addCmdBtn").addEventListener("click", () => {
  const cmd = el("cmdName").value.trim();
  const text = el("cmdText").value.trim();
  if (!cmd || !text) return alert("Komut ve yanıt boş olamaz.");
  if (!cmd.startsWith("!")) return alert("Komut ! ile başlamalı. Örn: !discord");

  commands.push({ cmd, text });
  el("cmdName").value = "";
  el("cmdText").value = "";
  refresh();
});

el("clearCmdsBtn").addEventListener("click", () => {
  commands.length = 0;
  refresh();
});

el("generateBtn").addEventListener("click", () => {
  const data = {
    site: {
      title: el("siteTitle").value.trim() || "ern427",
      status: el("siteStatus").value,
      announcement: el("siteAnnouncement").value.trim() || ""
    },
    links,
    commands
  };

  el("jsonOut").value = JSON.stringify(data, null, 2);
});

el("copyBtn").addEventListener("click", async () => {
  const text = el("jsonOut").value;
  if (!text) return alert("Önce JSON üret.");
  await navigator.clipboard.writeText(text);
  alert("Kopyalandı ✅ Şimdi data.json dosyana yapıştır.");
});

refresh();
