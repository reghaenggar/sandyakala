const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});


const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));


function openVideo(url) {
  document.getElementById('videoFrame').src = url + '?autoplay=1';
  document.getElementById('videoModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideo(event) {
  if (!event || event.target.id === 'videoModal' || event.target.classList.contains('video-modal-close')) {
    document.getElementById('videoFrame').src = '';
    document.getElementById('videoModal').classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideo();
});

// PRELOADER
(function () {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  if (!preloader || !fill) return;

  const images = document.querySelectorAll('img');
  let loaded = 0;
  const total = images.length || 1;

  function updateProgress() {
    loaded++;
    const percent = Math.min((loaded / total) * 100, 100);
    fill.style.width = percent + '%';
  }

  images.forEach(img => {
    if (img.complete) {
      updateProgress();
    } else {
      img.addEventListener('load', updateProgress);
      img.addEventListener('error', updateProgress);
    }
  });

  window.addEventListener('load', () => {
    fill.style.width = '100%';
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  });
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 6000);
})();

// HERO
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  const offset = window.scrollY * 0.4;
  heroBg.style.transform = `translateY(${offset}px)`;
});

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(ease * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
counterEls.forEach(el => counterObserver.observe(el));

const wawasanData = [
  {
    tag: "Info Umum",
    title: "Fasilitas Kampus",
    slides: [
      { image: "", text: "fasilitas olahraga kampus gratis yang berada di Taman Randu." },
      { image: "info-2.jpg", text: "Daftar organisasi mahasiswa yang aktif di lingkungan Fakultas Ekonomi dan Bisnis UNY." },
      { image: "info-3.jpg", text: "Panduan lengkap lainnya seputar kegiatan SANDYAKALA 2026." },
      { image: "info-4.jpg", text: "abcb" }
    ]
  },
  {
    title: "ORMAWA (Organisasi Mahasiswa)",
    slides: [
      { image: "asets/himadiksi.png", text: "HIMA DIKSI (Himpunan Mahasiswa Pendidikan Akuntansi) adalah organisasi kemahasiswaan tingkat jurusan di Fakultas Ekonomi dan Bisnis, Universitas Negeri Yogyakarta. Mereka mengadakan berbagai kegiatan akademik dan non-akademik, seperti lomba LCCA (Lomba Cerdas Cermat Akuntansi) dan bakti sosial." },
      { image: "asets/himaaksi.png", text: "HIMA AKSI FEB UNY (Himpunan Mahasiswa Akuntansi) adalah organisasi kemahasiswaan resmi di bawah Program Studi Akuntansi, Fakultas Ekonomi dan Bisnis, Universitas Negeri Yogyakarta. Organisasi ini menjadi wadah pengembangan minat, bakat, dan aspirasi mahasiswa akuntansi." },
      { image: "asets/himamenajemen.png", text: "HIMA Manajemen FEB UNY (Himpunan Mahasiswa Manajemen Fakultas Ekonomi dan Bisnis Universitas Negeri Yogyakarta) adalah organisasi kemahasiswaan tingkat jurusan yang mewadahi aspirasi, pengembangan minat, dan bakat mahasiswa program studi S1 Manajemen. Sekretariat Hima Manajemen berlokasi di Gedung Merah, Kampus FEB UNY.Organisasi ini secara aktif menyelenggarakan berbagai program kerja dan kegiatan bagi mahasiswa, seperti seminar, bimbingan akademik, bakti sosial, dan acara keakraban. Untuk informasi terbaru mengenai kegiatan, rekrutmen, atau kepengurusan, Anda dapat memantau akun resmi mereka.Booklet lengkap berisi profil organisasi kemahasiswaan di UNY." },
      { image: "asets/himapadp.png", text: "HIMA PADP FEB UNY (Himpunan Mahasiswa Pendidikan Administrasi Perkantoran) adalah organisasi kemahasiswaan di Fakultas Ekonomi dan Bisnis, Universitas Negeri Yogyakarta. Organisasi ini mewadahi pengembangan minat, bakat, dan penalaran mahasiswa program studi Pendidikan Administrasi Perkantoran melalui berbagai program kerja seperti seminar dan ajang perlombaan nasional." },
      { image: "asets/himape.png", text: "HIMA PE UNY atau Himpunan Mahasiswa Pendidikan Ekonomi di Fakultas Ekonomi dan Bisnis (FEB) Universitas Negeri Yogyakarta. Organisasi ini mewadahi mahasiswa prodi Pendidikan Ekonomi, menyelenggarakan berbagai kegiatan akademik dan kemahasiswaan seperti penyambutan mahasiswa baru, dan dipimpin melalui kepengurusan tertentu (seperti Kabinet Arsa Vikasa)." },
      { image: "asets/alfatih.png", text: "UKMF KM Al-Fatih FEB UNY adalah organisasi dakwah kampus yang bertujuan membentuk mahasiswa muslim yang bertaqwa & memiliki karakter Islam yang utuh sesuai Al-Qur'an dan As-Sunnah." },
      { image: "asets/dpm.png", text: "DPM KM FEB UNY (Dewan Perwakilan Mahasiswa Keluarga Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Negeri Yogyakarta) adalah lembaga legislatif tertinggi di tingkat fakultas. Organisasi ini bertugas menampung aspirasi mahasiswa, membuat peraturan, mengaudit, dan mengawasi kinerja Badan Eksekutif Mahasiswa (BEM) KM FEB UNY." },
      { image: "asets/bem.jpg", text: "BEM KM FEB UNY (Badan Eksekutif Mahasiswa Keluarga Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Negeri Yogyakarta) adalah lembaga eksekutif tertinggi di tingkat fakultas. Organisasi ini bertugas menjalankan program kerja, mengelola kegiatan kemahasiswaan, dan mewakili mahasiswa dalam berbagai forum." },
      { image: "asets/inspire.png", text: "INSPIRE FEB UNY (Unit Kegiatan Mahasiswa Fakultas Inspire) adalah organisasi kewirausahaan di Fakultas Ekonomi dan Bisnis, Universitas Negeri Yogyakarta. Berdiri sejak 2015, wadah ini melatih mahasiswa membangun jiwa wirausaha melalui empat divisi: Event Organizer, Human Resources Development, Business, dan Public Relation." },
      { image: "asets/kristal.png", text: "UKMF Penelitian KRISTAL (Komunitas Riset dan Penalaran) adalah Unit Kegiatan Mahasiswa Fakultas di bidang riset, penalaran, dan keilmuan yang berada di Fakultas Ekonomi dan Bisnis, Universitas Negeri Yogyakarta (FEB UNY). UKM ini mewadahi mahasiswa yang memiliki minat dalam penelitian, karya tulis ilmiah, dan kompetisi bisnis." },
      { image: "asets/kspm.png", text: "Kelompok Studi Pasar Modal (KSPM) FEB UNY adalah Unit Kegiatan Mahasiswa tingkat Fakultas (UKMF) di Universitas Negeri Yogyakarta yang berfokus pada edukasi dan pengembangan literasi keuangan serta investasi. UKM ini mengadakan berbagai program rutin, seperti pelatihan pasar modal, studi banding, dan seminar nasional." }
    ]
  },
  {
    tag: "PKKMB",
    title: "SANDYAKALA",
    slides: [
      { image: "artikel-1.jpg", text: "Kumpulan artikel tambahan seputar PKKMB SANDYAKALA 2026." },
      { image: "artikel-2.jpg", text: "Tips dan informasi bermanfaat untuk mahasiswa baru." }
    ]
  }
];

let currentItem = 0;
let currentSlide = 0;

function openDetailModal(itemIndex) {
  currentItem = itemIndex;
  currentSlide = 0;
  renderDetailModal();
  document.getElementById('detailModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal(event) {
  if (!event || event.target.id === 'detailModalOverlay' || event.target.classList.contains('detail-modal-close')) {
    document.getElementById('detailModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderDetailModal() {
  const item = wawasanData[currentItem];
  const slide = item.slides[currentSlide];

  document.getElementById('detailTag').textContent = item.tag;
  document.getElementById('detailTitle').textContent = item.title;
  document.getElementById('detailImage').style.backgroundImage = `url(${slide.image})`;
  document.getElementById('detailText').textContent = slide.text;

  const dotsContainer = document.getElementById('detailDots');
  dotsContainer.innerHTML = '';
  item.slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'detail-dot' + (i === currentSlide ? ' active' : '');
    dot.onclick = () => { currentSlide = i; renderDetailModal(); };
    dotsContainer.appendChild(dot);
  });
}

function nextSlide() {
  const total = wawasanData[currentItem].slides.length;
  currentSlide = (currentSlide + 1) % total;
  renderDetailModal();
}

function prevSlide() {
  const total = wawasanData[currentItem].slides.length;
  currentSlide = (currentSlide - 1 + total) % total;
  renderDetailModal();
}

function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

function openModal(tag, title, desc) {
  document.getElementById('modalTag').textContent = tag;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDesc').textContent = desc;
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(event) {
  if (event.target.id === 'modalOverlay') {
    closeModal();
  }
}

function setActive(el) {
  document.querySelectorAll('.feature-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

const jadwalData = [
  {
    day: "TMPT Online",
    date: "Senin, 4 Agustus 2026",
    jadwal: [
      { time: "06.30 - 07.15", activity: "Kedatangan Panitia" },
      { time: "07.15 - 08.00", activity: "Persiapan Panitia" },
      { time: "08.00 - 08.15", activity: "Briefing Panitia" },
      { time: "08.15 - 09.00", activity: "Pengkondisian Ekonom Muda" },
      { time: "09.00 - 09.10", activity: "Pembukaan acara dari MC" },
      { time: "09.10 - 09.20", activity: "Sambutan Koordinator Fakultas FEB UNY 2026" },
      { time: "09.20 - 09.35", activity: "Pembacaan tata tertib The Radiance of Sandyakala" },
      { time: "09.35 - 09.40", activity: "Chit-Chat MC" },
      { time: "09.40 - 09.50", activity: "Pembagian Gugus Ekonom Muda" },
      { time: "09.50 - 10.35", activity: "Pengenalan Pemandu Ekonom Muda" },
      { time: "10.35 - 11.05", activity: "Pemaparan Materi Rangkaian Program Ekonom Muda" },
      { time: "11.05 - 11.25", activity: "Pemaparan Penugasan Ekonom Muda" },
      { time: "11.25 - 11.40", activity: "Sesi Tanya Jawab" },
      { time: "11.40 - 11.45", activity: "Chit-Chat MC" },
      { time: "11.45 - 12.00", activity: "Penutupan dan Dokumentasi" },
      { time: "12.00 - 13.00", activity: "Clear Area" },
    ],
    keperluan: [
      "Alat tulis (buku catatan, pulpen)",
      "Air minum pribadi",
      "Obat-obatan pribadi (jika diperlukan)",
    ],
    atribut: [
      "Kemeja putih polos, celana/rok hitam bahan",
      "Sepatu pantofel hitam, kaos kaki putih",
      "Tanda pengenal (name tag) dari panitia",
      "Topi/pet berwarna hitam"
    ]
  },
  {
    day: "THE RADIANCE OF SANDYAKALA TMPT & FEB EXPLORE",
    date: "Sabtu, 8 Agustus 2026",
    jadwal: [
      { time: "06.30 - 07.15", activity: "Kedatangan Panitia" },
      { time: "07.00 - 07.45", activity: "Persiapan Panitia" },
      { time: "07.45 - 08.00", activity: "Briefing Panitia" },
      { time: "08.00 - 08.20", activity: "Pengkondisian Ekonom Muda" },
      { time: "08.20 - 08.30", activity: "Pembacaan tata tertib The Radiance of Sandyakala" },
      { time: "08.30 - 08.35", activity: "Sambutan Koordinator Fakultas FEB UNY 2026" },
      { time: "08.35 - 08.45", activity: "Perjalanan menuju kelas" },
      { time: "08.45 - 09.15", activity: "The Radiance of Sandyakala 2026 (Pemaparan Materi Rangkaian Acara PKKMB)" },
      { time: "09.15 - 09.40", activity: "Pemaparan Materi Rangkaian Acara PKKMB" },
      { time: "09.40 - 09.50", activity: "Ice Breaking" },
      { time: "09.50 - 10.20", activity: "Sosialisasi seputar FEB UNY" },
      { time: "10.20 - 10.35", activity: "Tanya Jawab & Sharing Session" },
      { time: "10.35 - 10.45", activity: "Pengondisian Ekonom Muda" },
      { time: "10.45 - 12.45", activity: "Explore FEB UNY" },
      { time: "12.45 - 13.00", activity: "Pos yel-yel, Jingle dan Flashmob" },
      { time: "13.05 - 14.05", activity: "Clear Area" },
    ],
    keperluan: [
      "Alat tulis (buku catatan, pulpen)",
      "Air minum pribadi",
      "Obat-obatan pribadi (jika diperlukan)",
    ],
    atribut: [
      "Kemeja putih polos, celana/rok hitam bahan",
      "Sepatu pantofel hitam, kaos kaki putih",
      "Tanda pengenal (name tag) dari panitia",
      "Topi/pet berwarna hitam"
    ]
  },
  {
    day: "SYNERGY CLASS",
    date: "Senin, 10 Agustus 2026",
    jadwal: [
      { time: "06.30 - 07.15", activity: "Kedatangan Panitia" },
      { time: "07.00 - 07.45", activity: "Persiapan Panitia" },
      { time: "07.45 - 08.00", activity: "Briefing Panitia" },
      { time: "08.00 - 08.30", activity: "Pengkondisian Ekonom Muda" },
      { time: "08.30 - 08.40", activity: "Pembacaan tata tertib Synergy Class 2026" },
      { time: "08.40 - 08.45", activity: "Sambutan Koordinator Fakultas FEB UNY 2026" },
      { time: "08.45 - 09.00", activity: "Perjalanan menuju kelas masing-masing" },
      { time: "09.00 - 09.30", activity: "Pemaparan Materi Bimbingan Karakter, KS dan Budaya Merokok" },
      { time: "09.30 - 09.45", activity: "Ice Breaking" },
      { time: "09.45 - 10.30", activity: "Pengenalann Ekonomi Kreatif Berbasis Asta Cita" },
      { time: "10.30 - 10.50", activity: "Pemaparan Materi Our Action as Young Entrepreneurs" },
      { time: "10.50 - 11.00", activity: "Tanya Jawab" },
      { time: "11.00 - 11.10", activity: "Pengondisian Ekonom Muda keluar kelas untuk sesi Forum Group Discussion" },
      { time: "11.10 - 11.40", activity: "Forum Group Discussion bersama Pemandu (Menghafalkan Yel-Yel dan Jingle)" },
      { time: "11.40 - 12.40", activity: "ISHOMA" },
      { time: "12.40 - 13.10", activity: "Pengkondisian kedatangan Ekonom Muda di Halaman PMD" },
      { time: "13.10 - 13.25", activity: "Pengenalan Komunitas FEB UNY" },
      { time: "13.25 - 14.25", activity: "Yel-Yel dan Jingle Flashmob Sandyakala 2026" },
      { time: "14.25 - 15.00", activity: "Kepulangan Ekonom Muda" },
      { time: "15.00 - 16.00", activity: "Clear Area" },
    ],
    keperluan: [
      "Alat tulis (buku catatan, pulpen)",
      "Air minum pribadi",
      "Obat-obatan pribadi (jika diperlukan)",
    ],
    atribut: [
      "Kemeja putih polos, celana/rok hitam bahan",
      "Sepatu pantofel hitam, kaos kaki putih",
      "Tanda pengenal (name tag) dari panitia",
      "Topi/pet berwarna hitam"
    ]
  },
  {
    day: "OUR ACTION AS YOUNG ENTREPRENEURS",
    date: "Rabu, 12 Agustus 2026",
    jadwal: [
      { time: "07.00- 07.30", activity: "Kedatangan Panitia" },
      { time: "07.30 - 07.45", activity: "Persiapan Panitia" },
      { time: "07.45 - 08.00", activity: "Briefing Panitia" },
      { time: "08.00 - 08.15", activity: "Pengkondisian Ekonom Muda" },
      { time: "08.15 - 08.20", activity: "Pembukaan acara oleh MC" },
      { time: "08.20 - 08.30", activity: "Pembacaan tata tertib Our Action as Young Entrepreneurs" },
      { time: "08.30 - 08.35", activity: "Sambutan Koordinator Fakultas" },
      { time: "08.35 - 08.40", activity: "Chit-Chat MC" },
      { time: "08.40 - 08.55", activity: "Pengkondisian Ekonom Muda ke kelas" },
      { time: "08.55- 09.25", activity: "Pengerjaan Bussiness Model Canvas (BMC)" },
      { time: "09.25 - 10.35", activity: "Presentasi Hasil BMC" },
      { time: "10.35 - 10.40", activity: "Ice Breaking" },
      { time: "10.40 - 10.55", activity: "Pengkondisian Ekonom Muda kembali ke halaman PMD" },
      { time: "10.55 - 11.00", activity: "Chit-Chat MC" },
      { time: "11.00 - 11.20", activity: "Yel Yel & Jingle Flashmob Sandyakala" },
      { time: "11.20 - 11.25", activity: "Penutupan acara oleh MC" },
      { time: "11.25 - 11.40", activity: "Kepulangan Ekonom Muda" },
      { time: "11.40 - 12.10", activity: "Clear Area" },
    ],
    keperluan: [
      "Alat tulis (buku catatan, pulpen)",
      "Air minum pribadi",
      "Obat-obatan pribadi (jika diperlukan)",
    ],
    atribut: [
      "Kemeja putih polos, celana/rok hitam bahan",
      "Sepatu pantofel hitam, kaos kaki putih",
      "Tanda pengenal (name tag) dari panitia",
      "Topi/pet berwarna hitam"
    ]
  },
  {
    day: "DISPLAY ORMAWA & KOMUNITAS",
    date: "Rabu, 19 Agustus 2026",
    jadwal: [
      { time: "08.00- 08.30", activity: "Kedatangan Panitia" },
      { time: "08.30 - 08.45", activity: "Persiapan Panitia" },
      { time: "08.45 - 08.55", activity: "Briefing Panitia" },
      { time: "08.55 - 09.15", activity: "Pengkondisian kedatangan Ekonom Muda" },
      { time: "09.15 - 09.30", activity: "Pembacaan Tata Tertib" },
      { time: "09.30 - 10.00", activity: "Forum Group Discussion & Sharing Session Bersama Pemandu" },
      { time: "10.00 - 11.00", activity: "Display Ormawa & Komunitas FEB" },
      { time: "11.00 - 12.00", activity: "ISHOMA" },
      { time: "12.00 - 12.10", activity: "Persiapan menuju Gor" },
      { time: "12.10 - 12.30", activity: "Perjalanan Menuju GOR" },
      { time: "12.30-  14.30", activity: "Display Ormawa & Komunitas Universitas" },
      { time: "14.30 - 15.00", activity: "Kepulangan Ekonom Muda" },
    ],
    keperluan: [
      "Alat tulis (buku catatan, pulpen)",
      "Air minum pribadi",
      "Obat-obatan pribadi (jika diperlukan)",
    ],
    atribut: [
      "Kemeja putih polos, celana/rok hitam bahan",
      "Sepatu pantofel hitam, kaos kaki putih",
      "Tanda pengenal (name tag) dari panitia",
      "Topi/pet berwarna hitam"
    ]
  },
  {
    day: "THE BRILLIANCE OF SANDYAKALA",
    date: "Kamis, 20 Agustus 2026",
    jadwal: [
      { time: "06.00 - 06.30", activity: "Kedatangan & Persiapan Panitia" },
      { time: "06.30 - 06.45", activity: "Briefing Panitia" },
      { time: "06.45 - 07.15", activity: "Open Gate & Pengondisian Kedatangan Ekonom Muda" },
      { time: "07.15 - 07.25", activity: "Sarapan Bersama" },
      { time: "07.25 - 07.35", activity: "Pembacaan Tata Tertib PKKMB Sandyakala KM FEB UNY 2026" },
      { time: "07.35 - 07.50", activity: "Tari Tradisional" },
      { time: "07.50 - 08.00", activity: "Opening MC" },
      { time: "08.00 - 08.05", activity: "Spiritual Journey: Pembacaan Tilawah" },
      { time: "08.05 - 08.10", activity: "Menyanyikan Lagu Indonesia Raya" },
      { time: "08.10 - 08.15", activity: "Menyanyikan Hymne UNY" },
      { time: "08.15 - 08.20", activity: "Sambutan Oleh Koordinator PKKMB Sandyakala KM FEB UNY 2026" },
      { time: "08.20 - 08.30", activity: "Sambutan oleh Ketua Pelaksana PKKMB Sandyakala KM FEB UNY 2026" },
      { time: "08.30 - 08.40", activity: "Sambutan oleh Dekan FEB UNY" },
      { time: "08.40 - 08.45", activity: "Chit Chat MC" },
      { time: "08.45 - 08.50", activity: "Pembacaan CV Moderator Halo FEB!" },
      { time: "08.50 - 09.30", activity: "Halo FEB!" },
      { time: "09.30 - 09.40", activity: "Sesi Tanya Jawab" },
      { time: "09.40 - 09.45", activity: "Penyerahan Plakat kepada Moderator dan Narasumber oleh Koordinator PKKMB Sandyakala KM FEB UNY 2026" },
      { time: "09.45 - 09.55", activity: "Chit Chat Moderator sekaligus Pembacaan CV Narasumber Seminar TEC Insight oleh Moderator" },
      { time: "09.55 - 10.35", activity: "Seminar TEC Insight." },
      { time: "10.35 - 10.45", activity: "Sesi Tanya Jawab" },
      { time: "10.45 - 10.50", activity: "Penyerahan Plakat kepada Narasumber oleh Koordinator PKKMB Sandyakala KM FEB UNY 2026" },
      { time: "10.50 - 10.55", activity: "Chit Chat MC" },
      { time: "10.55 - 11.10", activity: "Arunika Nusantara" },
      { time: "11.10 - 11.15", activity: "Chit Chat MC" },
      { time: "11.15 - 11.35", activity: "Open Mic Sponsorship" },
      { time: "11.35 - 12.35", activity: "ISHOMA" },
      { time: "12.35 - 12.45", activity: "Pengondisian Ekonom Muda" },
      { time: "12.45 - 12.50", activity: "Chit Chat MC" },
      { time: "12.50 - 13.30", activity: "Parade Ormawa" },
      { time: "13.30 - 13.40", activity: "Display Komunitas" },
      { time: "13.40 - 13.45", activity: "Chit Chat MC" },
      { time: "13.45 - 14.15", activity: "Games" },
      { time: "14.15 - 14.25", activity: "Awarding" },
      { time: "14.25 - 14.40", activity: "Penyerahan Simbolis Mahasiswa Baru kepada Koordinator PPSMB oleh Koordinator PKKMB Sandyakala KM FEB UNY 2026" },
      { time: "14.40 - 15.20", activity: "Yel-Yel & Jingle Flashmob Sandyakala" },
      { time: "15.20 - 15.50", activity: "Special Guest Star dan Closing MC" },
      { time: "15.50 - 16.00", activity: "Pengondisian Kepulangan Ekonom Muda" },
      { time: "16.00 - 17.00", activity: "Clear Area" },
    ],
    keperluan: [
      "Alat tulis (buku catatan, pulpen)",
      "Air minum pribadi",
      "Obat-obatan pribadi (jika diperlukan)",
    ],
    atribut: [
      "Kemeja putih polos, celana/rok hitam bahan",
      "Sepatu pantofel hitam, kaos kaki putih",
      "Tanda pengenal (name tag) dari panitia",
      "Topi/pet berwarna hitam"
    ]
  },
];

let currentJadwalDay = 0;

function openJadwalModal() {
  currentJadwalDay = 0;
  renderJadwalTabs();
  renderJadwalContent();
  document.getElementById('jadwalModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeJadwalModal(event) {
  if (!event || event.target.id === 'jadwalModalOverlay' || event.target.classList.contains('jadwal-modal-close')) {
    document.getElementById('jadwalModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderJadwalTabs() {
  const tabsContainer = document.getElementById('jadwalDayTabs');
  tabsContainer.innerHTML = '';
  jadwalData.forEach((d, i) => {
    const tab = document.createElement('button');
    tab.className = 'jadwal-tab' + (i === currentJadwalDay ? ' active' : '');
    tab.textContent = d.day;
    tab.onclick = () => {
      currentJadwalDay = i;
      renderJadwalTabs();
      renderJadwalContent();
    };
    tabsContainer.appendChild(tab);
  });
}

function renderJadwalContent() {
  const data = jadwalData[currentJadwalDay];
  document.getElementById('jadwalTitle').textContent = `Kegiatan Harian — ${data.date}`;

  const jadwalList = document.getElementById('jadwalList');
  jadwalList.innerHTML = '';
  data.jadwal.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="jadwal-time">${item.time}</span><span>${item.activity}</span>`;
    jadwalList.appendChild(li);
  });

  const keperluanList = document.getElementById('keperluanList');
  keperluanList.innerHTML = '';
  data.keperluan.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    keperluanList.appendChild(li);
  });

  const atributList = document.getElementById('atributList');
  atributList.innerHTML = '';
  data.atribut.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    atributList.appendChild(li);
  });
}

(function animateGrassDivider() {
  const polygon = document.getElementById('grassZigzag');
  if (!polygon) return;

  const width = 1600;
  const baseHeight = 100;
  const teeth = 20;
  const toothWidth = width / teeth;
  const baseShortPeak = 30;
  const baseTallPeak = 5;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function draw(time) {
    let points = [`0,${baseHeight}`];

    for (let i = 0; i <= teeth; i++) {
      const x = i * toothWidth;
      const phase = i * 0.4;
      const wave = prefersReduced ? 0 : Math.sin(time / 800 + phase) * 4;
      const basePeak = i % 2 === 0 ? baseShortPeak : baseTallPeak;
      const peak = basePeak + wave;
      points.push(`${x},${baseHeight - peak}`);
    }

    points.push(`${width},${baseHeight}`);
    polygon.setAttribute('points', points.join(' '));

    if (!prefersReduced) {
      requestAnimationFrame(draw);
    }
  }

  requestAnimationFrame(draw);
})();
