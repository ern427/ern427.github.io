// ===== STATE =====
let links = [];
let commands = [];

// ===== ELEMENTLER =====
const siteTitle = document.getElementById("siteTitle");
const siteStatus = document.getElementById("siteStatus");
const siteAnnouncement = document.getElementById("siteAnnouncement");

const linkLabel = document.getElementById("linkLabel");
const linkUrl = document.getElementById("linkUrl");
const linksList = document.getElementById("linksList");

const cmdName = document.getElementById("cmdName");
const cmdText = document.getElementById("cmdText");
const cmdsList = document.getElementById("cmdsList");

const jsonOut = document.getElementById("jsonOut");

// ===== LINK EKLE =====
document.getElementById("addLinkBtn").onclick = () => {
  if (!linkLabel.value || !linkUrl.value) return;

  links.push({ label: linkLabel.value, url: linkUrl.value });
  renderLinks();

  linkLabel.value = "";
  linkUrl.value = "";
};

document.getElementById("clearLinksBtn").onclick = () => {
  links = [];
  renderLinks();
};

function renderLinks() {
  linksList.innerHTML = "";
  links.forEach(l => {
    const li = document.createElement("li");
    li.textContent = `${l.label} → ${l.url}`;
    linksList.appendChild(li);
  });
}

// ===== KOMUT EKLE =====
document.getElementById("addCmdBtn").onclick = () => {
  if (!cmdName.value || !cmdText.value) return;

  commands.push({ cmd: cmdName.value, text: cmdText.value });
  renderCmds();

  cmdName.value = "";
  cmdText.value = "";
};

document.getElementById("clearCmdsBtn").onclick = () => {
  commands = [];
  renderCmds();
};

function renderCmds() {
  cmdsList.innerHTML = "";
  commands.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.cmd} → ${c.text}`;
    cmdsList.appendChild(li);
  });
}

// ===== JSON ÜRET =====
document.getElementById("generateBtn").onclick = () => {
  const data = {
    title: siteTitle.value,
    status: siteStatus.value,
    announcement: siteAnnouncement.value,
    links,
    commands
  };

  jsonOut.value = JSON.stringify(data, null, 2);
};

// ===== KOPYALA =====
document.getElementById("copyBtn").onclick = () => {
  jsonOut.select();
  document.execCommand("copy");
  alert("JSON kopyalandı");
};
