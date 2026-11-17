/* Jelajah: peta geosite interaktif + galeri lightbox. */
(function () {
  "use strict";
  const { situs, kategori, galeri } = JAGA;
  const NS = "http://www.w3.org/2000/svg";
  const proyeksi = (lat, lon) => [(lon - 98.42) * 1250, (2.96 - lat) * 1250];

  // ---------- peta ----------
  const wadahPin = document.getElementById("pin-pin");
  const panel = document.getElementById("panel-situs");
  let aktif = -1;
  let saringan = "semua";

  // Label diletakkan di kiri untuk titik di sisi timur peta agar tidak keluar bingkai
  situs.forEach((s, i) => {
    const [x, y] = proyeksi(s.lat, s.lon);
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "pin");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-pressed", "false");
    g.setAttribute("aria-label", `${s.nama}, ${kategori[s.kat].nama}`);
    g.dataset.i = i;
    const kiri = x > 760 || s.labelKiri;
    g.innerHTML =
      `<circle class="luar" cx="${x}" cy="${y}" r="11" fill="${kategori[s.kat].warna}"/>` +
      `<text x="${kiri ? x - 18 : x + 18}" y="${y + 5}" text-anchor="${kiri ? "end" : "start"}">${s.nama}</text>`;
    g.addEventListener("click", () => pilih(i));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pilih(i); }
    });
    wadahPin.appendChild(g);
  });

  const terlihat = () => situs.map((s, i) => i).filter((i) => saringan === "semua" || situs[i].kat === saringan);

  function pilih(i, fokusPanel) {
    aktif = i;
    const s = situs[i];
    wadahPin.querySelectorAll(".pin").forEach((p) => p.setAttribute("aria-pressed", String(+p.dataset.i === i)));
    const daftar = terlihat();
    const pos = daftar.indexOf(i);
    panel.innerHTML = `
      <span class="panel-situs__kategori"><span class="titik" style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${kategori[s.kat].warna}"></span>${kategori[s.kat].nama}</span>
      <h3 tabindex="-1">${s.nama}</h3>
      <p class="panel-situs__lokasi">${s.kab}</p>
      <p>${s.teks}</p>
      <div class="panel-situs__jaga">
        <h4>Cara menjaganya</h4>
        <ul>${s.jaga.map((j) => `<li>${j}</li>`).join("")}</ul>
      </div>
      <div class="panel-situs__nav">
        <button class="tombol tombol--garis tombol--kecil" type="button" data-geser="-1" ${pos <= 0 ? "disabled" : ""}>Sebelumnya</button>
        <span style="font-family:var(--f-display);font-size:var(--t-14);align-self:center">${pos + 1} dari ${daftar.length}</span>
        <button class="tombol tombol--garis tombol--kecil" type="button" data-geser="1" ${pos >= daftar.length - 1 ? "disabled" : ""}>Berikutnya</button>
      </div>`;
    if (fokusPanel) panel.querySelector("h3").focus();
    history.replaceState(null, "", "#" + s.id);
  }

  panel.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.hasAttribute("data-mulai")) { pilih(terlihat()[0], true); return; }
    const arah = +b.dataset.geser;
    if (!arah) return;
    const daftar = terlihat();
    const pos = daftar.indexOf(aktif);
    const baru = daftar[pos + arah];
    if (baru !== undefined) pilih(baru, true);
  });

  document.querySelectorAll(".saring button").forEach((b) => {
    b.addEventListener("click", () => {
      saringan = b.dataset.kat;
      document.querySelectorAll(".saring button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      wadahPin.querySelectorAll(".pin").forEach((p) => {
        const cocok = saringan === "semua" || situs[+p.dataset.i].kat === saringan;
        p.classList.toggle("redup", !cocok);
        p.setAttribute("tabindex", cocok ? "0" : "-1");
      });
      const daftar = terlihat();
      if (aktif < 0 || !daftar.includes(aktif)) pilih(daftar[0]);
      else pilih(aktif);
    });
  });

  // Buka geosite dari tautan (mis. jelajah.html#tuktuk)
  const dariHash = situs.findIndex((s) => "#" + s.id === location.hash);
  if (dariHash >= 0) {
    pilih(dariHash);
    document.getElementById("judul-peta").scrollIntoView();
  } else {
    pilih(0);
    history.replaceState(null, "", location.pathname);
  }

  // ---------- galeri ----------
  const wadahGaleri = document.getElementById("galeri");
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-gambar");
  const lbJudul = document.getElementById("lb-judul");
  const lbKet = document.getElementById("lb-ket");
  let gi = 0;

  galeri.forEach((g, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "g" + (i + 1);
    b.setAttribute("aria-label", "Perbesar ilustrasi: " + g.judul);
    b.innerHTML = `<img src="${g.src}" alt="" loading="lazy" width="${g.w || 900}" height="${g.h || 1100}"><figcaption>${g.judul}</figcaption>`;
    b.addEventListener("click", () => buka(i));
    wadahGaleri.appendChild(b);
  });

  function tampil(i) {
    gi = (i + galeri.length) % galeri.length;
    const g = galeri[gi];
    lbImg.src = g.src;
    lbImg.alt = g.ket;
    lbJudul.textContent = g.judul;
    lbKet.textContent = g.ket;
  }
  function buka(i) { tampil(i); lb.showModal(); }
  lb.addEventListener("click", (e) => {
    const b = e.target.closest("[data-arah]");
    if (b) tampil(gi + +b.dataset.arah);
  });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") tampil(gi + 1);
    if (e.key === "ArrowLeft") tampil(gi - 1);
  });
})();
