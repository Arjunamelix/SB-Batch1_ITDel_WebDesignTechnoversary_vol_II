/* Kontak: validasi formulir di sisi klien. Versi lomba menyimpan pesan di perangkat (tanpa server). */
(function () {
  "use strict";
  const form = document.getElementById("form-kontak");
  const berhasil = document.getElementById("berhasil");
  const topik = document.getElementById("k-topik");
  const kolomLokasi = document.getElementById("kolom-lokasi");
  const lokasi = document.getElementById("k-lokasi");
  const pesan = document.getElementById("k-pesan");
  const hitung = document.getElementById("hitung-pesan");

  const aturan = {
    "k-nama": (v) => (v.trim().length < 2 ? "Tulis namamu, minimal 2 huruf." : ""),
    "k-email": (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Tulis email yang valid, misalnya nama@gmail.com." : ""),
    "k-topik": (v) => (!v ? "Pilih salah satu topik." : ""),
    "k-lokasi": (v) => (topik.value === "lapor" && v.trim().length < 3 ? "Tulis lokasi agar laporan bisa ditindaklanjuti." : ""),
    "k-pesan": (v) => (v.trim().length < 10 ? "Pesan minimal 10 karakter." : ""),
  };

  function periksa(id) {
    const el = document.getElementById(id);
    const galat = aturan[id](el.value);
    document.getElementById("g-" + id.slice(2)).textContent = galat;
    if (galat) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
    return !galat;
  }

  Object.keys(aturan).forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("blur", () => { if (el.value) periksa(id); });
    el.addEventListener("input", () => { if (el.getAttribute("aria-invalid")) periksa(id); });
  });

  topik.addEventListener("change", () => {
    kolomLokasi.hidden = topik.value !== "lapor";
    periksa("k-topik");
  });
  pesan.addEventListener("input", () => { hitung.textContent = `${pesan.value.length} / 600`; });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ids = Object.keys(aturan).filter((id) => id !== "k-lokasi" || topik.value === "lapor");
    const gagal = ids.filter((id) => !periksa(id));
    if (gagal.length) { document.getElementById(gagal[0]).focus(); return; }

    const data = Object.fromEntries(new FormData(form));
    data.waktu = new Date().toISOString();
    const arsip = JAGA.simpan.ambil("pesan", []);
    arsip.push(data);
    JAGA.simpan.taruh("pesan", arsip);

    const label = { lapor: "Laporanmu", kolaborasi: "Ajakan kolaborasimu", tanya: "Pertanyaanmu" }[data.topik];
    document.getElementById("berhasil-teks").textContent =
      `Terima kasih, ${data.nama.trim().split(" ")[0]}. ${label} sudah tercatat dan balasan akan dikirim ke ${data.email.trim()}. ` +
      "Catatan versi lomba: pesan disimpan di peramban ini karena situs belum terhubung ke server.";
    form.hidden = true;
    berhasil.hidden = false;
    berhasil.focus();
  });

  document.getElementById("kirim-lagi").addEventListener("click", () => {
    form.reset();
    hitung.textContent = "0 / 600";
    kolomLokasi.hidden = true;
    berhasil.hidden = true;
    form.hidden = false;
    document.getElementById("k-nama").focus();
  });

  const params = new URLSearchParams(location.search);
  if (params.get("topik") === "lapor") { topik.value = "lapor"; kolomLokasi.hidden = false; }
  void lokasi;
})();
