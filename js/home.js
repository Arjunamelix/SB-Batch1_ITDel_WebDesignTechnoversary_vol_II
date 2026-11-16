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
