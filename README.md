# Jaga Tao — Berwisata ke Danau Toba tanpa Meninggalkan Jejak

Karya Tim **SB (Batch 1)** untuk **Lomba Web Design Techno Versary Vol. II** (HIMA-TI FKOM Universitas Kuningan), tema *EcoDigital For Environment*.
Sub-tema: **Konservasi Wisata Alam & Travel Destination Ramah Lingkungan**.

## Deskripsi website

*Tao* berarti danau dalam bahasa Batak Toba. Jaga Tao adalah situs kampanye dan edukasi untuk wisatawan yang ingin menikmati Kaldera Toba (UNESCO Global Geopark) tanpa menambah beban lingkungannya. Situs ini menggabungkan informasi, cerita, dan alat interaktif yang mengubah kepedulian menjadi tindakan nyata sebelum berangkat.

Latar belakang: status UNESCO Global Geopark Kaldera Toba sempat mendapat kartu kuning pada September 2023, lalu kembali meraih kartu hijau pada September 2025. Situs ini mengajak pengunjung ikut menjaga status itu lewat kebiasaan kecil.

### Halaman dan fitur

| Halaman | Isi & fitur |
|---|---|
| **Beranda** (`index.html`) | Panorama interaktif *Dijaga vs Dibiarkan*: geser garis untuk membandingkan masa depan danau. Lini masa status geopark, tiga ancaman lingkungan dan kebiasaan penangkalnya, serta sorotan geosite. |
| **Tentang** (`about.html`) | Misi Jaga Tao, diagram penampang kaldera (SVG), lima nilai istimewa Kaldera Toba, profil tim, dan sumber rujukan. |
| **Jelajah** (`jelajah.html`) | Konten/galeri: peta geosite interaktif (filter Geologi/Hayati/Budaya, navigasi keyboard, tautan langsung `#id-geosite`) dengan tips menjaga di tiap lokasi, plus galeri ilustrasi dengan lightbox. |
| **Cerita** (`cerita.html`) | Artikel: 6 artikel edukasi, pencarian, filter kategori, dan pembaca artikel dengan indikator progres. |
| **Aksi** (`aksi.html`) | Kalkulator jejak karbon perjalanan, daftar kemas nol sampah (tersimpan di perangkat), dan generator kartu *Ikrar Wisatawan* (unduh PNG / bagikan). |
| **Kontak** (`contact.html`) | Formulir kontak/lapor sampah dengan validasi, kolom lokasi dinamis, penghitung karakter, dan FAQ. |

### Teknologi

- HTML5, CSS3, dan JavaScript murni, **tanpa framework, template, atau komponen berbayar**.
- Semua ilustrasi (panorama, galeri, peta, ikon, logo) dibuat sendiri dalam format SVG.
- Font open-source (SIL OFL) dipasang lokal: *Anybody* dan *Newsreader*. Lisensinya ada di `assets/fonts/`.
- Responsif dari ponsel hingga desktop, mendukung navigasi keyboard, *skip link*, fokus terlihat, dan `prefers-reduced-motion`.
- Tanpa dependensi eksternal. Seluruh situs berjalan offline dan ukurannya sangat ringan.

## Petunjuk instalasi dan cara menjalankan

Tidak perlu instalasi atau proses *build*.

**Cara 1: buka langsung**
1. Unduh atau *clone* repository ini:
   ```bash
   git clone https://github.com/<username>/webdesign_SB_Batch1_technoversary_vol.II.git
   ```
2. Buka `index.html` di browser (Chrome, Edge, Firefox, atau Safari versi terbaru).

**Cara 2: lewat server lokal (disarankan)**
```bash
cd webdesign_SB_Batch1_technoversary_vol.II
python -m http.server 8000
# lalu buka http://localhost:8000
```
Bisa juga memakai ekstensi *Live Server* di VS Code.

**Cara 3: GitHub Pages**
Settings → Pages → Source: *Deploy from a branch* → pilih branch `main` dan folder `/ (root)`. File `.nojekyll` sudah disertakan.

## Struktur folder

```
webdesign_SB_Batch1_technoversary_vol.II/
├── index.html          Beranda
├── about.html          Tentang
├── jelajah.html        Konten: peta geosite & galeri
├── cerita.html         Artikel
├── aksi.html           Kalkulator, daftar kemas, ikrar
├── contact.html        Kontak
├── css/style.css
├── js/
│   ├── main.js         menu, toast, penyimpanan lokal
│   ├── data.js         data geosite, galeri, artikel
│   ├── home.js  jelajah.js  cerita.js  aksi.js  kontak.js
└── assets/
    ├── fonts/          Anybody & Newsreader (OFL)
    └── img/            ilustrasi SVG buatan sendiri
```

## Catatan data

- Kalkulator memakai faktor emisi dari UK DESNZ/DEFRA (kg CO₂e per km) sebagai perkiraan, karena belum ada faktor resmi khusus Indonesia.
- Peta bersifat ilustratif dan menampilkan 9 dari 16 geosite Kaldera Toba.
- Formulir kontak berjalan di sisi klien (data disimpan di `localStorage`) karena situs ini statis tanpa server.

## Tim SB (Batch 1)

| Nama | Peran |
|---|---|
| Nama Anggota 1 | Ketua tim, pengembang front-end |
| Nama Anggota 2 | Desain antarmuka & ilustrasi |
| Nama Anggota 3 | Riset konten & penulisan |
