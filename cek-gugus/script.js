
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
      { nim: '26808244002', nama: 'Ali Ahsan', ttl: '22/07/2007' },
      { nim: '26808244003', nama: 'Ezra', ttl: '10/01/2008' },
      { nim: '26808244004', nama: 'Aradya', ttl: '05/11/2007' },
      { nim: '26808244005', nama: 'Raka', ttl: '30/06/2007' },
    ]
  }
];

function cariGugus() {
  const nama = document.getElementById('inputNama').value.trim();

  if (!nama) {
    alert('Mohon isi nama kamu ya!');
    return;
  }

  showState('loading');
  document.getElementById('searchBtn').disabled = true;

  setTimeout(() => {
    let found = null;
    let foundAnggota = null;

    for (const gugus of dataGugus) {
      for (const anggota of gugus.anggota) {
        if (anggota.nama.toLowerCase() === nama.toLowerCase()) {
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
              <div class="member-niu">${m.nim}</div>
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