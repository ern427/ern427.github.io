async function loadData() {
  const res = await fetch("data.json", { cache: "no-store" });
  if (!res.ok) throw new Error("data.json okunamadı");
  return await res.json();
}

function render(data) {
  const statusEl = document.getElementById("statusText");
  const annEl = document.getElementById("announcementText");

  if (statusEl) statusEl.textContent = `Durum: ${data.site.status}`;
  if (annEl) annEl.textContent = data.site.announcement;

  const linksWrap = document.getElementById("links");
  linksWrap.innerHTML = "";
  data.links.forEach((l) => {
    const a = document.createElement("a");
    a.href = l.url;
    a.target = "_blank";
    a.textContent = l.label;
    a.style.marginRight = "12px";
    linksWrap.appendChild(a);
  });

  const cmdUl = document.getElementById("commands");
  cmdUl.innerHTML = "";
  data.commands.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = `${c.cmd} → ${c.text}`;
    cmdUl.appendChild(li);
  });
}

loadData().then(render);
