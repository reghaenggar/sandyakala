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
      { image: "info-4.jpg", text: "abcb"}
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
      {image : "asets/bem.jpg", text: "BEM KM FEB UNY (Badan Eksekutif Mahasiswa Keluarga Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Negeri Yogyakarta) adalah lembaga eksekutif tertinggi di tingkat fakultas. Organisasi ini bertugas menjalankan program kerja, mengelola kegiatan kemahasiswaan, dan mewakili mahasiswa dalam berbagai forum." },
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
    day: "Hari 1",
    date: "Senin, 3 Agustus 2026",
    jadwal: [
      { time: "06.30 - 07.00", activity: "Registrasi ulang & pengecekan atribut" },
      { time: "07.00 - 08.00", activity: "Upacara pembukaan PKKMB SANDYAKALA" },
      { time: "08.00 - 10.00", activity: "Sambutan Rektor & Dekan FEB UNY" },
      { time: "10.00 - 12.00", activity: "Pengenalan lingkungan kampus" },
      { time: "12.00 - 13.00", activity: "Istirahat, sholat, makan (ISHOMA)" },
      { time: "13.00 - 15.00", activity: "Materi kebangsaan dan nasionalisme" },
      { time: "15.00 - 16.00", activity: "Penutupan hari pertama" }
    ],
    keperluan: [
      "Kartu Tanda Mahasiswa sementara (KTM)",
      "Alat tulis (buku catatan, pulpen)",
      "Air minum pribadi",
      "Obat-obatan pribadi (jika diperlukan)",
      "Masker cadangan"
    ],
    atribut: [
      "Kemeja putih polos, celana/rok hitam bahan",
      "Sepatu pantofel hitam, kaos kaki putih",
      "Tanda pengenal (name tag) dari panitia",
      "Topi/pet berwarna hitam"
    ]
  },
  {
    day: "Hari 2",
    date: "Selasa, 4 Agustus 2026",
    jadwal: [
      { time: "06.30 - 07.00", activity: "Presensi dan pengecekan atribut" },
      { time: "07.00 - 09.00", activity: "Materi akademik dan sistem perkuliahan" },
      { time: "09.00 - 11.00", activity: "Pengenalan ORMAWA dan UKM" },
      { time: "11.00 - 12.00", activity: "Diskusi kelompok gugus" },
      { time: "12.00 - 13.00", activity: "ISHOMA" },
      { time: "13.00 - 15.00", activity: "Talkshow motivasi bersama alumni" },
      { time: "15.00 - 16.00", activity: "Evaluasi harian & penutupan" }
    ],
    keperluan: [
      "Alat tulis",
      "Air minum pribadi",
      "Formulir kegiatan yang sudah diisi",
      "Jas hujan (jika musim hujan)"
    ],
    atribut: [
      "Kemeja batik almamater",
      "Celana/rok hitam bahan",
      "Sepatu pantofel hitam",
      "Tanda pengenal dari panitia"
    ]
  },
  {
    day: "Hari 3",
    date: "Rabu, 5 Agustus 2026",
    jadwal: [
      { time: "06.30 - 07.00", activity: "Presensi akhir dan persiapan" },
      { time: "07.00 - 09.00", activity: "Pentas seni dan budaya gugus" },
      { time: "09.00 - 11.00", activity: "Lomba antar gugus" },
      { time: "11.00 - 12.00", activity: "Pengumuman gugus terbaik" },
      { time: "12.00 - 13.00", activity: "ISHOMA" },
      { time: "13.00 - 14.30", activity: "Upacara penutupan PKKMB SANDYAKALA" },
      { time: "14.30 - 15.00", activity: "Foto bersama & dokumentasi" }
    ],
    keperluan: [
      "Perlengkapan pentas seni (jika tampil)",
      "Air minum pribadi",
      "Alat tulis"
    ],
    atribut: [
      "Pakaian adat/kreasi sesuai tema gugus",
      "Tanda pengenal dari panitia",
      "Sepatu bebas rapi"
    ]
  }
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
