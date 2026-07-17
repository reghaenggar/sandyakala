// ── DATA DUMMY GUGUS ──
const dataGugus = [
  {
    id: 'G001',
    nama: 'GIBRAN',
    nomor: 'Gugus 01',
    lokasi: 'Gedung PMD Lt. 2',
    pendamping: 'JOKOWI (085700104952)',
    jadwal: 'Senin, 07.00 WIB',
    anggota: [
      { nim: '26808244001', nama: 'Regha', ttl: '01/01/2007' },
      { nim: '26808244002', nama: 'Bela', ttl: '22/07/2007' },
      { nim: '26808244003', nama: 'Candra', ttl: '10/01/2008' },
      { nim: '26808244004', nama: 'Dewi', ttl: '05/11/2007' },
      { nim: '26808244005', nama: 'Eko', ttl: '30/06/2007' },
    ]
  },
  // {
  //   id: 'G002',
  //   nama: 'Babirusa',
  //   nomor: 'Gugus 02',
  //   lokasi: 'Aula Utama',
  //   pendamping: 'Sari Indah',
  //   jadwal: 'Senin, 07.30 WIB',
  //   anggota: [
  //     { niu: '26808244011', nama: 'Fajar Nugroho', ttl: '12/04/2007' },
  //     { niu: '26808244012', nama: 'Gita Permata', ttl: '08/09/2007' },
  //     { niu: '26808244013', nama: 'Hendra Susilo', ttl: '20/12/2007' },
  //     { niu: '26808244014', nama: 'Indah Lestari', ttl: '03/02/2008' },
  //     { niu: '26808244015', nama: 'Joko Prabowo', ttl: '17/08/2007' },
  //   ]
  // },
  // {
  //   id: 'G003',
  //   nama: 'Cendrawasih',
  //   nomor: 'Gugus 03',
  //   lokasi: 'Gedung B Lt. 1',
  //   pendamping: 'Budi Santoso',
  //   jadwal: 'Selasa, 07.00 WIB',
  //   anggota: [
  //     { niu: '26808244021', nama: 'Kartika Sari', ttl: '25/05/2007' },
  //     { niu: '26808244022', nama: 'Lingga Permana', ttl: '14/10/2007' },
  //     { niu: '26808244023', nama: 'Maya Putri', ttl: '07/03/2008' },
  //     { niu: '26808244024', nama: 'Nanda Kusuma', ttl: '19/06/2007' },
  //     { niu: '26808244025', nama: 'Omar Fauzi', ttl: '28/11/2007' },
  //   ]
  // },
  // {
  //   id: 'G004',
  //   nama: 'Dugong',
  //   nomor: 'Gugus 04',
  //   lokasi: 'Lapangan Tengah',
  //   pendamping: 'Putri Wahyuni',
  //   jadwal: 'Selasa, 07.30 WIB',
  //   anggota: [
  //     { niu: '26808244031', nama: 'Pandu Wibowo', ttl: '11/01/2008' },
  //     { niu: '26808244032', nama: 'Qori Rahmadani', ttl: '23/07/2007' },
  //     { niu: '26808244033', nama: 'Rini Susanti', ttl: '06/04/2007' },
  //     { niu: '26808244034', nama: 'Sigit Prakoso', ttl: '18/09/2007' },
  //     { niu: '26808244035', nama: 'Tari Anggraini', ttl: '02/12/2007' },
  //   ]
  // },
];

function cariGugus() {
  const nim = document.getElementById('inputNIM').value.trim();
  const dd = document.getElementById('inputDD').value.trim().padStart(2, '0');
  const mm = document.getElementById('inputMM').value.trim().padStart(2, '0');
  const yyyy = document.getElementById('inputYYYY').value.trim();

  if (!nim || !dd || !mm || !yyyy) {
    alert('Mohon lengkapi semua data ya!');
    return;
  }

  const ttlInput = `${dd}/${mm}/${yyyy}`;

  showState('loading');
  document.getElementById('searchBtn').disabled = true;

  setTimeout(() => {
    let found = null;
    let foundAnggota = null;

    for (const gugus of dataGugus) {
      for (const anggota of gugus.anggota) {
        if (anggota.nim === nim && anggota.ttl === ttlInput) {
          found = gugus;
          foundAnggota = anggota;
          break;
        }
      }
      if (found) break;
    }

    document.getElementById('searchBtn').disabled = false;

    if (found) {
      tampilkanHasil(found, foundAnggota);
    } else {
      showState('error');
    }
  }, 1200);
}

function tampilkanHasil(gugus, anggota) {
  document.getElementById('resultGugusNama').textContent = gugus.nama;
  document.getElementById('resultNomor').textContent = gugus.nomor;
  document.getElementById('resultLokasi').textContent = gugus.lokasi;
  document.getElementById('resultPendamping').textContent = gugus.pendamping;
  document.getElementById('resultJadwal').textContent = gugus.jadwal;

  const memberList = document.getElementById('memberList');
  memberList.innerHTML = '';

  gugus.anggota.forEach(m => {
    const isMe = m.nim === anggota.nim;
    const inisial = m.nama.split(' ').map(n => n[0]).slice(0, 2).join('');
    memberList.innerHTML += `
          <div class="member-item ${isMe ? 'highlight' : ''}">
            <div class="member-avatar ${isMe ? 'highlight-av' : ''}">${inisial}</div>
            <div>
              <div class="member-name">${m.nama}</div>
              <div class="member-niu">${m.niu}</div>
            </div>
            ${isMe ? '<span class="member-you">Kamu</span>' : ''}
          </div>
        `;
  });

  showState('result');
}

function showState(state) {
  document.getElementById('emptyState').style.display = state === 'empty' ? 'flex' : 'none';
  document.getElementById('loadingState').style.display = state === 'loading' ? 'flex' : 'none';
  document.getElementById('errorState').style.display = state === 'error' ? 'flex' : 'none';
  document.getElementById('resultState').style.display = state === 'result' ? 'flex' : 'none';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') cariGugus();
});

document.getElementById('inputDD').addEventListener('input', function () {
  if (this.value.length === 2) document.getElementById('inputMM').focus();
});
document.getElementById('inputMM').addEventListener('input', function () {
  if (this.value.length === 2) document.getElementById('inputYYYY').focus();
});