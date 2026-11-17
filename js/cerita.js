/* Cerita: daftar artikel dengan pencarian, saringan kategori, dan pembaca. */
(function () {
  "use strict";
  const data = JAGA.artikel;
  const elUtama = document.getElementById("artikel-utama");
  const elDaftar = document.getElementById("daftar-artikel");
  const elJumlah = document.getElementById("jumlah-hasil");
  const cari = document.getElementById("cari");
  const pembaca = document.getElementById("pembaca");
  const konten = document.getElementById("pembaca-konten");
  const isiGulir = document.getElementById("pembaca-isi");
  const progres = pembaca.querySelector(".pembaca__progres span");
  let kat = "Semua";

  const normal = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const teksPolos = (html) => html.replace(/<[^>]+>/g, " ");

  function saring() {
    const kata = normal(cari.value.trim()).split(/\s+/).filter(Boolean)
      .map((k) => new RegExp("(^|[^a-z0-9])" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    return data.filter((a) => {
      const cocokKat = kat === "Semua" || a.kat === kat;
      const teks = normal(a.judul + " " + a.ringkas + " " + teksPolos(a.isi));
      const cocokCari = kata.every((r) => r.test(teks));
      return cocokKat && cocokCari;
    });
  }

  function render() {
    const hasil = saring();
    elJumlah.textContent = `${hasil.length} artikel ditemukan`;
    if (!hasil.length) {
      elUtama.innerHTML = "";
      elDaftar.innerHTML = `<li class="kosong" style="grid-column:1/-1"><h3>Belum ada artikel yang cocok</h3>
        <p>Coba kata lain, misalnya "sampah" atau "ikan", atau pilih kategori Semua.</p>
        <button class="tombol tombol--garis tombol--kecil" type="button" data-reset>Tampilkan semua artikel</button></li>`;
      return;
    }
    const [utama, ...lain] = hasil;
    elUtama.innerHTML = `
      <article class="artikel-utama">
        <img src="${utama.gambar}" alt="" width="1200" height="900">
        <div class="artikel-utama__teks">
          <div class="meta"><span class="tag-kat">${utama.kat}</span><span>${utama.menit} menit baca</span></div>
          <h2>${utama.judul}</h2>
          <p>${utama.ringkas}</p>
          <div><button class="tombol tombol--terang" type="button" data-baca="${utama.id}">Baca artikel</button></div>
        </div>
      </article>`;
    elDaftar.innerHTML = lain.map((a) => `
      <li>
        <div class="gambar"><img src="${a.gambar}" alt="" loading="lazy" width="1200" height="900"></div>
        <div class="meta"><span class="tag-kat">${a.kat}</span><span>${a.menit} menit baca</span></div>
        <h3><button type="button" data-baca="${a.id}">${a.judul}</button></h3>
        <p>${a.ringkas}</p>
      </li>`).join("");
  }

  function baca(id) {
    const a = data.find((x) => x.id === id);
    if (!a) return;
    konten.innerHTML = `
      <img src="${a.gambar}" alt="" width="900" height="400">
      <div class="pembaca__badan">
        <div class="meta"><span class="tag-kat">${a.kat}</span><span>${a.menit} menit baca</span></div>
        <h2 id="pb-judul">${a.judul}</h2>
        ${a.isi}
        <div class="kotak-aksi"><h3>Yang bisa kamu lakukan</h3><ul>${a.aksi.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      </div>`;
    isiGulir.scrollTop = 0;
    progres.style.width = "0";
    pembaca.showModal();
    history.replaceState(null, "", "#" + id);
  }

  isiGulir.addEventListener("scroll", () => {
    const maks = isiGulir.scrollHeight - isiGulir.clientHeight;
    progres.style.width = (maks > 0 ? (isiGulir.scrollTop / maks) * 100 : 100) + "%";
  });
  pembaca.addEventListener("close", () => history.replaceState(null, "", location.pathname));

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-baca]");
    if (b) baca(b.dataset.baca);
    if (e.target.closest("[data-reset]")) {
      cari.value = ""; kat = "Semua";
      document.querySelectorAll(".saring button").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.kat === "Semua")));
      render();
    }
  });

  let jeda;
  cari.addEventListener("input", () => { clearTimeout(jeda); jeda = setTimeout(render, 120); });
  document.querySelectorAll(".saring button").forEach((b) => {
    b.addEventListener("click", () => {
      kat = b.dataset.kat;
      document.querySelectorAll(".saring button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      render();
    });
  });

  render();
  const dariHash = location.hash.slice(1);
  if (dariHash) baca(dariHash);
})();
