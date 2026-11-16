/* Skrip bersama: menu seluler, toast, penyimpanan aman. */
(function () {
  "use strict";
  window.JAGA = window.JAGA || {};

  // Penyimpanan lokal yang tidak error di mode privat
  JAGA.simpan = {
    ambil(kunci, bawaan) {
      try {
        const v = localStorage.getItem("jagatao:" + kunci);
        return v === null ? bawaan : JSON.parse(v);
      } catch (e) { return bawaan; }
    },
    taruh(kunci, nilai) {
      try { localStorage.setItem("jagatao:" + kunci, JSON.stringify(nilai)); } catch (e) { /* abaikan */ }
    },
  };

  let timerToast;
  JAGA.toast = function (pesan) {
    const el = document.querySelector(".toast");
    if (!el) return;
    el.textContent = pesan;
    el.classList.add("tampil");
    clearTimeout(timerToast);
    timerToast = setTimeout(() => el.classList.remove("tampil"), 2800);
  };

  // Menu seluler
  const tombol = document.querySelector(".nav__tombol");
  const daftar = document.getElementById("menu-utama");
  if (tombol && daftar) {
    const tutup = () => { tombol.setAttribute("aria-expanded", "false"); daftar.classList.remove("terbuka"); };
    tombol.addEventListener("click", () => {
      const buka = tombol.getAttribute("aria-expanded") !== "true";
      tombol.setAttribute("aria-expanded", String(buka));
      daftar.classList.toggle("terbuka", buka);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") tutup(); });
    document.addEventListener("click", (e) => { if (!e.target.closest(".kepala")) tutup(); });
  }

  // Dialog: tutup saat klik backdrop atau tombol bertanda data-tutup
  document.querySelectorAll("dialog").forEach((d) => {
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-tutup]")) d.close();
    });
  });
})();
