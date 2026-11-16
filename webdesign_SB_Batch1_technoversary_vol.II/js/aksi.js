/* Aksi: kalkulator jejak karbon, daftar kemas, kartu ikrar. */
(function () {
  "use strict";
  const fmt = (n) => n.toLocaleString("id-ID", { maximumFractionDigits: n < 10 ? 1 : 0 });

  /* ====================== 1. KALKULATOR ====================== */
  // kg CO2e per km. "kendaraan": dibagi jumlah penumpang. Sumber: faktor DESNZ/DEFRA (lihat catatan di halaman).
  const MODA = {
    pesawat: { nama: "Pesawat", f: 0.229, kendaraan: false },
    mobil: { nama: "Mobil pribadi", f: 0.163, kendaraan: true },
    travel: { nama: "Travel / minibus", f: 0.104, kendaraan: false },
    bus: { nama: "Bus antarkota", f: 0.028, kendaraan: false },
    motor: { nama: "Sepeda motor", f: 0.114, kendaraan: true },
  };
  const KAPAL = { f: 0.019, km: 10 };

  const asal = document.getElementById("asal");
  const jarak = document.getElementById("jarak");
  const penumpang = document.getElementById("penumpang");
  const kapal = document.getElementById("kapal");
  const galatJarak = document.getElementById("galat-jarak");
  const kolomPenumpang = document.getElementById("kolom-penumpang");

  function emisi(modaId, km, orang, pakaiKapal) {
    const m = MODA[modaId];
    let per = km * 2 * m.f;
    if (m.kendaraan) per /= Math.max(1, orang);
    if (pakaiKapal) per += KAPAL.km * 2 * KAPAL.f;
    return per;
  }

  function hitung() {
    const km = parseFloat(jarak.value);
    const modaId = document.querySelector('input[name="moda"]:checked').value;
    const m = MODA[modaId];
    kolomPenumpang.hidden = !m.kendaraan;
    if (modaId === "motor") penumpang.max = 2; else penumpang.max = 8;
    let orang = parseInt(penumpang.value, 10) || 1;
    if (orang > +penumpang.max) { orang = +penumpang.max; penumpang.value = orang; }

    if (!km || km < 1 || km > 20000) {
      galatJarak.textContent = "Isi jarak antara 1 dan 20.000 km.";
      jarak.setAttribute("aria-invalid", "true");
      return;
    }
    galatJarak.textContent = "";
    jarak.removeAttribute("aria-invalid");

    const nilai = emisi(modaId, km, orang, kapal.checked);
    document.getElementById("angka-emisi").textContent = fmt(nilai);
    document.getElementById("ket-emisi").textContent =
      `per orang, pulang-pergi ${fmt(km * 2)} km dengan ${m.nama.toLowerCase()}` + (kapal.checked ? " dan kapal" : "");

    const semua = Object.keys(MODA)
      .filter((k) => !(k === "motor" && km > 400))
      .map((k) => ({ k, v: emisi(k, km, MODA[k].kendaraan ? orang : 1, kapal.checked) }));
    const maks = Math.max(...semua.map((x) => x.v));
    semua.sort((a, b) => b.v - a.v);
    document.getElementById("batang").innerHTML = semua.map((x) => `
      <li class="${x.k === modaId ? "dipilih" : ""}">
        <span>${MODA[x.k].nama}</span>
        <span class="jalur"><span class="isi" style="width:${(x.v / maks) * 100}%"></span></span>
        <span class="nilai-batang">${fmt(x.v)} kg</span>
      </li>`).join("");

    const terendah = semua[semua.length - 1];
    const saran = document.getElementById("saran");
    if (terendah.k === modaId) {
      saran.textContent = "Pilihanmu sudah yang paling rendah emisinya untuk perjalanan ini.";
    } else {
      const hemat = nilai - terendah.v;
      saran.textContent = `Dengan ${MODA[terendah.k].nama.toLowerCase()}, kamu bisa mengurangi sekitar ${fmt(hemat)} kg CO₂e (${Math.round((hemat / nilai) * 100)}% lebih rendah).`;
    }
    JAGA.simpan.taruh("kalk", { asal: asal.value, km, modaId, orang, kapal: kapal.checked });
  }

  asal.addEventListener("change", () => {
    const o = asal.selectedOptions[0];
    if (asal.value !== "custom") {
      jarak.value = asal.value;
      const r = document.querySelector(`input[name="moda"][value="${o.dataset.moda}"]`);
      if (r) r.checked = true;
    } else {
      jarak.focus();
      jarak.select();
    }
    hitung();
  });
  jarak.addEventListener("input", () => { asal.value = "custom"; hitung(); });
  [penumpang, kapal].forEach((el) => el.addEventListener("input", hitung));
  document.querySelectorAll('input[name="moda"]').forEach((r) => r.addEventListener("change", hitung));

  const lama = JAGA.simpan.ambil("kalk", null);
  if (lama) {
    asal.value = lama.asal; jarak.value = lama.km; penumpang.value = lama.orang; kapal.checked = lama.kapal;
    const r = document.querySelector(`input[name="moda"][value="${lama.modaId}"]`);
    if (r) r.checked = true;
  }
  hitung();

  /* ====================== 2. DAFTAR KEMAS ====================== */
  const KEMAS = [
    { grup: "Minum dan makan", isi: [
      ["botol", "Botol minum isi ulang", "Mengganti botol plastik sekali pakai selama perjalanan."],
      ["wadah", "Wadah makan bertutup", "Untuk membungkus makanan dari warung tanpa styrofoam."],
      ["alat", "Sendok, garpu, dan sedotan pakai ulang", "Simpan dalam satu kantong kain kecil."],
      ["termos", "Gelas atau termos kecil", "Kopi Sidikalang dan teh hangat tanpa gelas plastik."],
    ]},
    { grup: "Belanja dan sampah", isi: [
      ["tas", "Tas kain lipat", "Untuk oleh-oleh dan belanja di pasar."],
      ["kantong", "Kantong sampah kecil", "Tempat sementara sampahmu sampai menemukan tempat sampah."],
      ["puntung", "Wadah puntung rokok (jika merokok)", "Agar puntung tidak tertinggal di lereng atau pantai."],
    ]},
    { grup: "Kebersihan diri", isi: [
      ["sabun", "Sabun dan sampo batang", "Lebih sedikit kemasan. Pakai di kamar mandi, bukan di danau."],
      ["sunscreen", "Pelindung matahari dalam wadah isi ulang", "Matahari di dataran tinggi lebih terik dari yang terasa."],
      ["handuk", "Handuk cepat kering", "Mengurangi permintaan cucian harian di penginapan."],
    ]},
  ];
  const elKemas = document.getElementById("daftar-kemas");
  const dicentang = new Set(JAGA.simpan.ambil("kemas", []));
  const total = KEMAS.reduce((n, g) => n + g.isi.length, 0);

  elKemas.innerHTML = KEMAS.map((g) => `
    <div class="cek__grup">
      <h3>${g.grup}</h3>
      <ul class="cek__daftar">${g.isi.map(([id, nama, ket]) => `
        <li><label><input type="checkbox" value="${id}" ${dicentang.has(id) ? "checked" : ""}><span><b>${nama}</b>${ket}</span></label></li>`).join("")}
      </ul>
    </div>`).join("");

  const cincin = document.getElementById("cincin-maju");
  const keliling = 2 * Math.PI * 64;
  cincin.style.strokeDasharray = keliling;

  function perbaruiKemas() {
    const n = dicentang.size;
    const p = Math.round((n / total) * 100);
    cincin.style.strokeDashoffset = keliling * (1 - n / total);
    document.getElementById("cincin-teks").textContent = p + "%";
    const judul = document.getElementById("kemas-judul");
    const ket = document.getElementById("kemas-ket");
    if (n === 0) { judul.textContent = "Tasmu masih kosong"; ket.textContent = "Mulai dari botol minum. Itu yang paling banyak mencegah sampah."; }
    else if (n < total) { judul.textContent = `${n} dari ${total} sudah masuk tas`; ket.textContent = `Tinggal ${total - n} lagi. Yang belum ada tidak harus dibeli baru; pinjam atau pakai yang ada di rumah.`; }
    else { judul.textContent = "Tasmu siap berangkat"; ket.textContent = "Semua sudah dikemas. Sampai jumpa di Toba."; }
    JAGA.simpan.taruh("kemas", [...dicentang]);
  }
  elKemas.addEventListener("change", (e) => {
    const c = e.target;
    if (c.checked) dicentang.add(c.value); else dicentang.delete(c.value);
    perbaruiKemas();
    if (dicentang.size === total) JAGA.toast("Tas siap. Terima kasih sudah berkemas tanpa sampah.");
  });
  document.getElementById("kemas-ulang").addEventListener("click", () => {
    dicentang.clear();
    elKemas.querySelectorAll("input").forEach((i) => (i.checked = false));
    perbaruiKemas();
    JAGA.toast("Daftar kemas dikosongkan.");
  });
  perbaruiKemas();

  /* ====================== 3. IKRAR ====================== */
  const JANJI = [
    "Membawa pulang semua sampah yang kubawa",
    "Tidak memakai sabun atau sampo di air danau",
    "Tidak memberi makan satwa liar",
    "Memakai botol minum isi ulang",
    "Tidak menyalakan api di lereng berumput",
    "Membeli oleh-oleh dari perajin setempat",
    "Tidak mencoret atau mengambil batu di geosite",
  ];
  const elJanji = document.getElementById("pilihan-janji");
  elJanji.innerHTML = JANJI.map((j, i) => `<label><input type="checkbox" value="${i}"><span>${j}</span></label>`).join("");
  const hitungJanji = document.getElementById("hitung-janji");
  const terpilih = () => [...elJanji.querySelectorAll("input:checked")].map((i) => +i.value);

  elJanji.addEventListener("change", () => {
    const n = terpilih().length;
    hitungJanji.textContent = `(${n} dari 3)`;
    elJanji.querySelectorAll("input").forEach((i) => { i.disabled = !i.checked && n >= 3; });
    document.getElementById("galat-janji").textContent = "";
    gambar();
  });

  const kanvas = document.getElementById("kanvas-ikrar");
  const ctx = kanvas.getContext("2d");
  const nama = document.getElementById("nama-ikrar");
  nama.addEventListener("input", () => { document.getElementById("galat-nama").textContent = ""; nama.removeAttribute("aria-invalid"); gambar(); });

  function bungkus(teks, x, y, lebar, tinggi) {
    const kata = teks.split(" ");
    let baris = "", yy = y;
    for (const k of kata) {
      const coba = baris ? baris + " " + k : k;
      if (ctx.measureText(coba).width > lebar && baris) { ctx.fillText(baris, x, yy); baris = k; yy += tinggi; }
      else baris = coba;
    }
    ctx.fillText(baris, x, yy);
    return yy + tinggi;
  }

  function gambar() {
    const W = kanvas.width, H = kanvas.height;
    // latar danau
    const lg = ctx.createLinearGradient(0, 0, 0, H);
    lg.addColorStop(0, "#1d5561"); lg.addColorStop(1, "#0e3640");
    ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);
    // bukit kaldera
    ctx.fillStyle = "#2b4335";
    ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, 980); ctx.quadraticCurveTo(260, 900, 520, 1010);
    ctx.quadraticCurveTo(800, 1110, W, 960); ctx.lineTo(W, H); ctx.fill();
    ctx.fillStyle = "#a9bfa6";
    ctx.beginPath(); ctx.ellipse(560, 1035, 220, 34, 0, Math.PI, 0); ctx.fill();
    // pita gorga
    for (let x = 0; x < W; x += 56) {
      ctx.fillStyle = (x / 56) % 2 ? "#fbfcfa" : "#a3271c";
      ctx.beginPath(); ctx.moveTo(x, 70); ctx.lineTo(x + 28, 30); ctx.lineTo(x + 56, 70); ctx.fill();
    }
    ctx.fillStyle = "#1a1e1d"; ctx.fillRect(0, 70, W, 10);

    ctx.fillStyle = "#d6cbb4";
    ctx.font = '600 34px "Anybody", sans-serif';
    ctx.fillText("Ikrar wisatawan Danau Toba", 80, 170);

    const n = nama.value.trim() || "Namamu";
    ctx.fillStyle = "#fbfcfa";
    ctx.font = '800 112px "Anybody", sans-serif';
    let y = bungkus("Aku, " + n + ",", 80, 290, W - 160, 112);
    ctx.font = '400 50px "Newsreader", Georgia, serif';
    ctx.fillStyle = "#d3e2df";
    y = bungkus("berjanji menjaga Tao selama berkunjung:", 80, y + 10, W - 160, 62);

    const pilih = terpilih();
    const isi = pilih.length ? pilih.map((i) => JANJI[i]) : ["Pilih tiga janji di formulir"];
    y += 40;
    isi.forEach((j) => {
      ctx.fillStyle = "#a3271c";
      ctx.beginPath(); ctx.arc(98, y - 16, 14, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fbfcfa";
      ctx.font = '600 46px "Anybody", sans-serif';
      y = bungkus(j, 140, y, W - 220, 56) + 26;
    });

    ctx.fillStyle = "#fbfcfa";
    ctx.font = '800 44px "Anybody", sans-serif';
    ctx.fillText("Jaga Tao", 80, H - 90);
    ctx.font = '400 30px "Newsreader", Georgia, serif';
    ctx.fillStyle = "#c7d6d2";
    const tgl = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    ctx.textAlign = "right";
    ctx.fillText(tgl, W - 80, H - 90);
    ctx.textAlign = "left";
  }

  document.getElementById("form-ikrar").addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    if (!nama.value.trim()) {
      document.getElementById("galat-nama").textContent = "Tulis nama panggilanmu untuk kartu ikrar.";
      nama.setAttribute("aria-invalid", "true"); nama.focus(); ok = false;
    }
    if (terpilih().length !== 3) {
      document.getElementById("galat-janji").textContent = `Pilih tepat tiga janji. Saat ini ${terpilih().length} dipilih.`;
      if (ok) elJanji.querySelector("input:not(:disabled)").focus();
      ok = false;
    }
    if (!ok) return;
    gambar();
    document.getElementById("unduh-ikrar").disabled = false;
    document.getElementById("bagikan-ikrar").disabled = false;
    document.getElementById("status-ikrar").textContent = "Kartu ikrar dibuat. Unduh atau bagikan ke temanmu.";
    JAGA.toast("Kartu ikrar dibuat");
  });

  const keBlob = () => new Promise((r) => kanvas.toBlob(r, "image/png"));
  document.getElementById("unduh-ikrar").addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = "ikrar-jaga-tao.png";
    a.href = kanvas.toDataURL("image/png");
    a.click();
    document.getElementById("status-ikrar").textContent = "Kartu diunduh sebagai ikrar-jaga-tao.png.";
  });
  document.getElementById("bagikan-ikrar").addEventListener("click", async () => {
    const status = document.getElementById("status-ikrar");
    try {
      const blob = await keBlob();
      const file = new File([blob], "ikrar-jaga-tao.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Ikrar Jaga Tao", text: "Aku berikrar menjaga Danau Toba." });
        status.textContent = "Kartu dibagikan.";
      } else {
        await navigator.clipboard.writeText("Aku berikrar menjaga Danau Toba bersama Jaga Tao. " + location.href);
        status.textContent = "Perangkat ini belum mendukung berbagi gambar. Teks ajakan sudah disalin; unduh kartunya untuk diunggah manual.";
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
      status.textContent = "Berbagi tidak tersedia di peramban ini. Unduh kartunya lalu unggah manual.";
    }
  });

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(gambar);
})();
