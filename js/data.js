/* Data konten Jaga Tao: geosite, galeri, dan artikel.
   Disimpan di satu berkas agar mudah diperbarui tanpa mengubah HTML. */

window.JAGA = window.JAGA || {};

JAGA.kategori = {
  geologi: { nama: "Geologi", warna: "#a3271c" },
  hayati: { nama: "Hayati", warna: "#3f7a46" },
  budaya: { nama: "Budaya", warna: "#1a1e1d" },
};

/* Koordinat perkiraan (lintang, bujur). Peta bersifat ilustratif. */
JAGA.situs = [
  {
    id: "sipisopiso",
    nama: "Sipisopiso–Tongging",
    kab: "Kabupaten Karo",
    kat: "geologi",
    lat: 2.915, lon: 98.52,
    teks: "Air terjun setinggi lebih dari 100 meter yang jatuh dari bibir dinding kaldera di ujung utara danau. Dari pelatarannya terlihat jelas bagaimana dinding kaldera memeluk Danau Toba.",
    jaga: [
      "Jalur tangga ke dasar air terjun panjang dan curam. Bawa minum dalam botol isi ulang.",
      "Tidak ada tempat sampah di jalur bawah. Bawa naik lagi semua bungkus makananmu.",
      "Tetap di jalur resmi agar lereng tidak tergerus.",
    ],
  },
  {
    id: "sibaganding",
    nama: "Sibaganding",
    kab: "Kabupaten Simalungun",
    kat: "hayati",
    lat: 2.70, lon: 98.912,
    teks: "Kawasan hutan di jalan menuju Parapat yang dihuni kelompok monyet liar. Tempat termudah untuk melihat bahwa kaldera juga rumah bagi satwa.",
    jaga: [
      "Jangan memberi makan monyet. Makanan manusia membuat mereka bergantung dan agresif.",
      "Simpan makanan dan plastik di dalam tas tertutup.",
      "Pelankan kendaraan di ruas jalan yang melewati hutan.",
    ],
  },
  {
    id: "tuktuk",
    nama: "Semenanjung Tuktuk",
    kab: "Kabupaten Samosir",
    kat: "budaya",
    lat: 2.668, lon: 98.872,
    teks: "Tanjung kecil di sisi timur Samosir yang menjadi pusat penginapan wisatawan, dekat dengan kampung adat di Tomok dan Ambarita.",
    jaga: [
      "Tanyakan ke penginapan ke mana limbah kamar mandinya dibuang.",
      "Pakai sabun dan sampo di kamar mandi, bukan saat berenang di danau.",
      "Beli suvenir langsung dari perajinnya.",
    ],
  },
  {
    id: "pusuk-buhit",
    nama: "Pusuk Buhit",
    kab: "Kabupaten Samosir",
    kat: "budaya",
    lat: 2.60, lon: 98.64,
    teks: "Gunung di sisi barat danau yang dalam tradisi lisan Batak dianggap tempat asal-usul leluhur. Lerengnya yang berumput rawan terbakar saat kemarau.",
    jaga: [
      "Hormati tempat yang dianggap sakral. Minta izin sebelum memotret upacara.",
      "Jangan menyalakan api di lereng berumput.",
      "Bawa turun puntung rokok dan bungkus makanan.",
    ],
  },
  {
    id: "sidihoni",
    nama: "Huta Tinggi–Sidihoni",
    kab: "Kabupaten Samosir",
    kat: "geologi",
    lat: 2.565, lon: 98.775,
    teks: "Danau kecil di atas Pulau Samosir: sebuah danau di pulau yang berada di tengah danau. Kawasan ini juga dipakai untuk pelatihan pemandu geowisata.",
    jaga: [
      "Jangan membuang sisa makanan atau mencuci kendaraan di tepi danau kecil ini.",
      "Gunakan jasa pemandu lokal untuk memahami cerita geologinya.",
      "Parkir di area yang disediakan agar padang rumput tidak rusak.",
    ],
  },
  {
    id: "bakkara",
    nama: "Bakkara–Tipang",
    kab: "Kabupaten Humbang Hasundutan",
    kat: "budaya",
    lat: 2.335, lon: 98.83, labelKiri: true,
    teks: "Lembah subur di barat daya danau yang diapit dinding kaldera curam. Bakkara dikenal sebagai kampung halaman Raja Sisingamangaraja XII.",
    jaga: [
      "Sawah adalah tempat kerja warga. Minta izin sebelum berjalan di pematang.",
      "Beli hasil bumi langsung dari petani.",
      "Bawa pulang sampahmu karena fasilitas pengolahan di desa terbatas.",
    ],
  },
  {
    id: "sibandang",
    nama: "Pulau Sibandang",
    kab: "Kabupaten Tapanuli Utara",
    kat: "budaya",
    lat: 2.322, lon: 98.893,
    teks: "Pulau berpenghuni di teluk Muara, ujung selatan danau. Untuk ke sana, naik perahu warga dari Muara.",
    jaga: [
      "Ikuti aturan keselamatan di perahu warga.",
      "Jangan membuang apa pun ke air selama penyeberangan.",
      "Hormati kampung dan ruang pribadi warga pulau.",
    ],
  },
  {
    id: "batu-basiha",
    nama: "Batu Basiha",
    kab: "Kabupaten Toba",
    kat: "geologi",
    lat: 2.362, lon: 99.03,
    teks: "Situs geologi di Kecamatan Balige, sisi tenggara danau. Batuannya bagian dari catatan alam tentang bagaimana kawasan ini terbentuk.",
    jaga: [
      "Jangan memanjat atau mencoret batuan.",
      "Jangan mengambil batu sebagai oleh-oleh.",
      "Baca papan informasi di lokasi sebelum menjelajah.",
    ],
  },
  {
    id: "liang-sipege",
    nama: "Liang Sipege",
    kab: "Kabupaten Toba",
    kat: "geologi",
    lat: 2.342, lon: 99.058,
    teks: "Gua di Desa Pea Talun, Balige. Liang berarti gua dalam bahasa Batak.",
    jaga: [
      "Bawa senter sendiri dan jangan menyentuh ornamen gua.",
      "Jangan meninggalkan coretan di dinding gua.",
      "Masuk bersama pemandu lokal.",
    ],
  },
];

JAGA.galeri = [
  { src: "assets/img/foto-sipisopiso.webp", judul: "Sipisopiso–Tongging", ket: "Air terjun yang jatuh dari bibir dinding kaldera, Kabupaten Karo.", w: 1400, h: 935 },
  { src: "assets/img/foto-tuktuk.webp", judul: "Semenanjung Tuktuk", ket: "Atap pelana bergaya Batak di tepi danau, dengan dinding kaldera di seberangnya.", w: 1200, h: 600 },
  { src: "assets/img/foto-rumah-bolon.webp", judul: "Rumah bolon", ket: "Deretan rumah adat Batak Toba dengan atap pelana dan ukiran gorga.", w: 600, h: 400 },
  { src: "assets/img/foto-kursi-batu.webp", judul: "Kursi batu di huta", ket: "Kursi batu di bawah pohon besar di tengah huta, Pulau Samosir.", w: 706, h: 579 },
  { src: "assets/img/foto-pusuk-buhit.webp", judul: "Pusuk Buhit", ket: "Gunung di sisi barat danau yang dalam tradisi Batak dianggap asal-usul leluhur.", w: 1024, h: 683 },
];

JAGA.artikel = [
  {
    id: "kartu-hijau",
    kat: "Isu",
    judul: "Kartu kuning, kartu hijau: apa artinya bagi wisatawan?",
    ringkas: "Status UNESCO Global Geopark untuk Kaldera Toba pernah terancam. Ini ceritanya, dan peran kecil yang bisa diambil pengunjung.",
    gambar: "assets/img/artikel-kartu-hijau.svg",
    menit: 4,
    isi: `
<p>Kaldera Toba ditetapkan sebagai UNESCO Global Geopark pada Juli 2020. Status ini bukan gelar seumur hidup. UNESCO menilai ulang setiap geopark secara berkala untuk memastikan kawasan itu benar-benar dikelola demi konservasi, edukasi, dan kesejahteraan warganya.</p>
<p>Pada rapat UNESCO Global Geopark di Maroko, 4–5 September 2023, Kaldera Toba menerima <em>kartu kuning</em>: peringatan bahwa sejumlah kriteria belum terpenuhi. Pengelola diberi waktu dua tahun untuk berbenah. Rekomendasinya antara lain memperbaiki tata kelola, menyusun peta geologi kawasan, dan meningkatkan visibilitas geopark lewat papan informasi di geosite.</p>
<p>Setelah asesor UNESCO datang lagi pada Juli 2025, kabar baik datang pada September 2025: Kaldera Toba kembali meraih <em>kartu hijau</em>, penilaian tertinggi dalam jaringan geopark global. Status itu berlaku untuk empat tahun ke depan.</p>
<h3>Lalu, apa hubungannya dengan kita?</h3>
<p>Penilaian geopark melihat apakah warisan geologi, hayati, dan budaya dijaga, dan apakah masyarakat ikut merasakan manfaatnya. Wisatawan ada di tengah semua itu. Sampah yang ditinggalkan di geosite, papan informasi yang dicoret, atau uang yang hanya mengalir ke luar daerah ikut menentukan wajah geopark di mata penilai berikutnya.</p>
<p>Kartu hijau bukan garis akhir. Ini kesempatan empat tahun untuk membuktikan bahwa Toba memang layak menyandangnya.</p>`,
    aksi: [
      "Baca papan interpretasi di setiap geosite yang kamu datangi.",
      "Gunakan pemandu, penginapan, dan warung milik warga setempat.",
      "Laporkan kerusakan fasilitas atau tumpukan sampah lewat halaman Kontak.",
    ],
  },
  {
    id: "eceng-gondok",
    kat: "Hayati",
    judul: "Eceng gondok: hijau di permukaan, masalah di bawahnya",
    ringkas: "Hamparan hijau di tepi danau terlihat indah di foto. Di bawahnya, air kehilangan cahaya dan oksigen.",
    gambar: "assets/img/artikel-eceng-gondok.svg",
    menit: 3,
    isi: `
<p>Eceng gondok adalah tanaman air yang tumbuh sangat cepat di air yang kaya nutrien. Di beberapa teluk Danau Toba, hamparannya bisa menutupi permukaan air hingga perahu sulit lewat.</p>
<p>Masalahnya bukan pada tanamannya saja. Hamparan yang rapat menghalangi cahaya matahari masuk ke air. Saat tanaman mati dan membusuk, oksigen di dalam air ikut terpakai. Ikan dan biota lain yang hidup di bawahnya yang paling dirugikan.</p>
<h3>Dari mana nutriennya?</h3>
<p>Eceng gondok tumbuh subur karena air danau menerima terlalu banyak nitrogen dan fosfor. Sumbernya beragam: limbah rumah tangga dan penginapan yang dibuang langsung, pupuk dari lahan pertanian yang terbawa hujan, serta sisa pakan dan kotoran ikan dari keramba jaring apung.</p>
<p>Membersihkan eceng gondok membantu, tetapi selama nutrien terus masuk, tanaman ini akan tumbuh lagi. Pencegahan di sumbernya jauh lebih efektif.</p>
<p>Ada sisi baiknya juga: eceng gondok yang sudah diangkat dan dikeringkan bisa dianyam menjadi tas, tikar, dan kerajinan lain.</p>`,
    aksi: [
      "Pilih penginapan yang punya septic tank atau pengolahan limbah, bukan yang membuang langsung ke danau.",
      "Jangan memakai sabun, sampo, atau deterjen di air danau.",
      "Beli kerajinan eceng gondok dari perajin lokal.",
    ],
  },
  {
    id: "ihan-batak",
    kat: "Hayati",
    judul: "Ihan Batak, ikan yang kini dilindungi penuh",
    ringkas: "Dulu hadir di setiap pesta adat, kini makin sulit ditemukan. Mengenal ikan endemik Danau Toba dan sungai-sungai di sekitarnya.",
    gambar: "assets/img/artikel-ihan-batak.svg",
    menit: 3,
    isi: `
<p>Ihan Batak (<em>Neolissochilus thienemanni</em>) adalah ikan endemik perairan Danau Toba dan sungai-sungai di sekitarnya. Dalam upacara adat Batak Toba, ikan ini biasa dimasak menjadi arsik, hidangan ikan berbumbu kuning dengan rempah andaliman.</p>
<p>Populasinya terus menurun. Penangkapan berlebihan, menurunnya kualitas air, dan masuknya jenis ikan dari luar yang menjadi pesaing membuat ihan Batak makin langka. Di banyak keluarga, arsik ihan sudah lama diganti dengan ikan mas.</p>
<p>Melalui Keputusan Menteri Kelautan dan Perikanan Nomor 1 Tahun 2021, ihan Batak ditetapkan sebagai jenis ikan yang dilindungi dengan status perlindungan penuh. Artinya, ikan ini tidak boleh ditangkap atau diperdagangkan dari alam.</p>
<h3>Harapan dari budidaya</h3>
<p>Beberapa warga dan lembaga riset kini membudidayakan ihan Batak agar generasi berikutnya tetap bisa mengenalnya. Pelestarian habitatnya, yaitu sungai yang jernih dan berarus deras, sama pentingnya dengan budidaya itu sendiri.</p>`,
    aksi: [
      "Jangan membeli atau memesan ihan Batak hasil tangkapan alam.",
      "Jaga kebersihan sungai di sekitar danau, terutama saat berkemah.",
      "Ceritakan kisah ihan Batak kepada teman seperjalananmu.",
    ],
  },
  {
    id: "nol-sampah",
    kat: "Panduan",
    judul: "Liburan nol sampah ke Samosir dalam lima kebiasaan",
    ringkas: "Tidak perlu peralatan mahal. Cukup lima kebiasaan kecil yang dimulai dari isi tasmu.",
    gambar: "assets/img/artikel-nol-sampah.svg",
    menit: 4,
    isi: `
<p>Di daerah wisata, sampah yang paling banyak ditemukan biasanya justru yang paling sederhana: botol air mineral, kantong kresek, bungkus mi instan, dan gelas plastik. Kabar baiknya, sebagian besar bisa dicegah sejak sebelum berangkat.</p>
<h3>1. Botol isi ulang</h3>
<p>Banyak penginapan dan rumah makan bersedia mengisi ulang botolmu dengan air matang. Tanyakan saja.</p>
<h3>2. Tas kain yang bisa dilipat</h3>
<p>Simpan satu di saku tas. Tolak kantong plastik saat membeli oleh-oleh atau buah di pasar.</p>
<h3>3. Wadah makan dan alat makan sendiri</h3>
<p>Berguna untuk membungkus makanan dari warung dan menghindari styrofoam.</p>
<h3>4. Kantong sampah kecil</h3>
<p>Jika tidak menemukan tempat sampah, sampahmu tetap punya tempat sampai kamu kembali ke penginapan atau ke kota.</p>
<h3>5. Makan di tempat</h3>
<p>Duduk sebentar di warung lokal bukan hanya mengurangi sampah, tapi juga cara terbaik mengenal Toba.</p>`,
    aksi: [
      "Gunakan daftar kemas di halaman Aksi sebelum berangkat.",
      "Bawa pulang baterai dan sampah elektronik ke kota asalmu.",
    ],
  },
  {
    id: "keramba",
    kat: "Isu",
    judul: "Keramba jaring apung dan kejernihan air danau",
    ringkas: "Keramba memberi penghidupan bagi banyak keluarga, tetapi danau punya batas daya tampung. Di mana titik tengahnya?",
    gambar: "assets/img/artikel-keramba.svg",
    menit: 4,
    isi: `
<p>Keramba jaring apung adalah kandang ikan berupa jaring yang digantung pada rangka terapung. Di Danau Toba, keramba banyak dipakai untuk membudidayakan ikan nila, baik oleh warga maupun perusahaan.</p>
<p>Bagi banyak keluarga, keramba adalah sumber penghasilan. Namun ikan di keramba diberi pakan setiap hari. Sisa pakan yang tidak termakan dan kotoran ikan jatuh ke dasar danau dan menambah nutrien di air. Jika jumlah keramba melebihi kemampuan danau untuk memulihkan diri, kualitas air menurun, air menjadi keruh, dan eceng gondok serta alga tumbuh lebih cepat.</p>
<h3>Mencari keseimbangan</h3>
<p>Karena itu, pemerintah daerah berupaya menata ulang jumlah dan lokasi keramba agar sesuai dengan daya tampung danau. Penataan ini tidak mudah karena menyangkut mata pencaharian warga dan juga masa depan pariwisata yang bergantung pada air yang jernih.</p>
<p>Sebagai wisatawan, kita tidak menentukan kebijakan. Tapi kita bisa memahami bahwa air jernih yang kita nikmati adalah hasil kompromi banyak pihak, dan mendukung upaya penataan itu.</p>`,
    aksi: [
      "Pelajari isu ini sebelum berkunjung agar bisa berdiskusi dengan warga secara adil.",
      "Dukung usaha wisata yang ikut menjaga kualitas air.",
    ],
  },
  {
    id: "kemarau",
    kat: "Panduan",
    judul: "Berwisata di lereng kaldera saat musim kemarau",
    ringkas: "Lereng berumput di sekitar danau mudah terbakar saat kemarau. Satu puntung rokok bisa jadi awalnya.",
    gambar: "assets/img/artikel-kemarau.svg",
    menit: 3,
    isi: `
<p>Banyak lereng di sekitar Danau Toba ditumbuhi rumput dan semak. Saat kemarau panjang, vegetasi ini mengering dan sangat mudah terbakar. Kebakaran di perbukitan sekitar danau beberapa kali terjadi dan harus dipadamkan bersama oleh petugas dan warga.</p>
<p>Dampaknya tidak berhenti saat api padam. Lereng yang gundul kehilangan akar yang menahan tanah, sehingga saat hujan datang, tanah lebih mudah longsor dan terbawa ke danau. Habitat satwa ikut hilang, dan asapnya mengganggu warga serta wisatawan.</p>
<h3>Yang perlu diingat saat mendaki atau berkemah</h3>
<p>Gunakan kompor portabel, bukan api unggun, kecuali di tempat yang memang disediakan. Pastikan puntung rokok benar-benar padam dan bawa pulang. Jangan membakar sampah di lokasi.</p>
<p>Jika melihat asap atau api di lereng, segera beri tahu warga terdekat, pengelola tempat wisata, atau perangkat desa.</p>`,
    aksi: [
      "Bawa kompor portabel jika ingin memasak saat berkemah.",
      "Simpan puntung rokok di wadah tertutup dan bawa pulang.",
      "Laporkan asap atau api kepada warga atau pengelola terdekat.",
    ],
  },
];
