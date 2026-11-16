/* Beranda: panorama geser "dijaga / dibiarkan". */
(function () {
  "use strict";
  const panorama = document.querySelector(".panorama");
  const input = document.getElementById("geser-panorama");
  if (!panorama || !input) return;

  const set = (v) => panorama.style.setProperty("--posisi", v + "%");
  input.addEventListener("input", () => set(input.value));

  // Penekan pointer langsung di mana saja di panorama (lebih natural di layar sentuh)
  let tekan = false;
  const dariPointer = (e) => {
    const r = panorama.getBoundingClientRect();
    const v = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    input.value = Math.round(v);
    set(v.toFixed(1));
  };
  panorama.addEventListener("pointerdown", (e) => { tekan = true; dariPointer(e); });
  window.addEventListener("pointermove", (e) => { if (tekan) dariPointer(e); });
  window.addEventListener("pointerup", () => { tekan = false; });

  // Satu momen gerak saat halaman dibuka: garis menyapu pelan memperlihatkan sisi "dibiarkan"
  const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!kurangiGerak) {
    const mulai = performance.now();
    const dari = 92, ke = 62, durasi = 1400;
    set(dari);
    const langkah = (t) => {
      if (tekan) return;
      const k = Math.min(1, (t - mulai - 500) / durasi);
      if (k < 0) { requestAnimationFrame(langkah); return; }
      const e = 1 - Math.pow(1 - k, 3);
      const v = dari + (ke - dari) * e;
      set(v.toFixed(2));
      input.value = Math.round(v);
      if (k < 1) requestAnimationFrame(langkah);
    };
    requestAnimationFrame(langkah);
  }
})();

/* Beranda: simulasi "danau mengikuti pilihanmu". */
(function () {
  "use strict";
  const svg = document.querySelector(".sim__svg");
  if (!svg) return;
  const saklar = [...document.querySelectorAll(".sim__saklar input")];
  const titik = [...document.querySelectorAll(".sim__meter i")];
  const judul = document.getElementById("sim-judul");
  const ket = document.getElementById("sim-ket");
  const ajakan = document.getElementById("sim-ajakan");
  const TEKS = [
    ["Danau yang dibiarkan", "Belum ada kebiasaan yang dinyalakan."],
    ["Mulai membaik", "Satu kebiasaan sudah terasa. Tiga lagi."],
    ["Setengah jalan", "Dua dari empat kebiasaan menyala."],
    ["Hampir pulih", "Tinggal satu kebiasaan lagi."],
    ["Toba yang terjaga", "Empat kebiasaan kecil, dikali seribu pengunjung."],
  ];
  function perbarui() {
    let n = 0;
    saklar.forEach((s) => {
      svg.classList.toggle("ok-" + s.dataset.lapis, s.checked);
      if (s.checked) n++;
    });
    titik.forEach((t, i) => t.classList.toggle("isi", i < n));
    judul.textContent = TEKS[n][0];
    ket.textContent = TEKS[n][1];
    ajakan.hidden = n < saklar.length;
  }
  saklar.forEach((s) => s.addEventListener("change", perbarui));
  perbarui();
})();

