const CSV_URL_MAHASISWA = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSozzo6yxG0c1d5HDz9Wc3oR452la2Dii7M439yZzocU0U1sUu3UeIhlnLHuMaqVvV4vAqc-FZtTDrY/pub?gid=593318522&single=true&output=csv';
const CSV_URL_PEMANDU = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSozzo6yxG0c1d5HDz9Wc3oR452la2Dii7M439yZzocU0U1sUu3UeIhlnLHuMaqVvV4vAqc-FZtTDrY/pub?gid=810022032&single=true&output=csv';

let dataGugus = [];
let dataReady = false;

async function loadData() {
  try {
    const [mahasiswaCSV, pemanduCSV] = await Promise.all([
      fetchCSV(CSV_URL_MAHASISWA),
      fetchCSV(CSV_URL_PEMANDU)
    ]);

    dataGugus = buildDataGugus(mahasiswaCSV, pemanduCSV);
    dataReady = true;
  } catch (err) {
    console.error('Gagal memuat data dari Google Sheets:', err);
    dataReady = false;
  }
}

function fetchCSV(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err)
    });
  });
}

function buildDataGugus(mahasiswaRows, pemanduRows) {
  const map = new Map();

  mahasiswaRows.forEach(row => {
    const klaster = (row.Klaster || '').trim();
    const gugus = (row.Gugus || '').trim();
    const nama = (row.Nama || '').trim();
    const prodi = (row.Prodi || '').trim();
    if (!gugus || !nama) return;

    const key = klaster + '||' + gugus;
    if (!map.has(key)) {
      map.set(key, { klaster, nama: gugus, pemandu: [], anggota: [] });
    }
    map.get(key).anggota.push({ nama, prodi });
  });

  pemanduRows.forEach(row => {
    const klaster = (row.Klaster || '').trim();
    const gugus = (row.Gugus || '').trim();
    const pemandu = (row.Pemandu || '').trim();
    const cp = (row.CP || '').trim();
    if (!gugus || !pemandu) return;

    const key = klaster + '||' + gugus;
    if (!map.has(key)) {
      map.set(key, { klaster, nama: gugus, pemandu: [], anggota: [] });
    }
    map.get(key).pemandu.push({ nama: pemandu, cp });
  });

  return Array.from(map.values());
}

function cariGugus() {
  const nama = document.getElementById('inputNama').value.trim();

  if (!nama) {
    alert('Mohon isi nama kamu ya!');
    return;
  }

  if (!dataReady) {
    alert('Data belum selesai dimuat, coba lagi sebentar ya!');
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
  }, 600);
}

function tampilkanHasil(gugus, anggota) {
  document.getElementById('resultGugusNama').textContent = gugus.nama;
  document.getElementById('resultKlaster').textContent = gugus.klaster;
  document.getElementById('resultProdi').textContent = anggota.prodi;

  const pemanduList = document.getElementById('pemanduList');
  pemanduList.innerHTML = '';
  gugus.pemandu.forEach(p => {
    const inisial = p.nama.split(' ').map(n => n[0]).slice(0, 2).join('');
    pemanduList.innerHTML += `
          <div class="pemandu-item">
            <div class="pemandu-avatar">${inisial}</div>
            <div>
              <div class="pemandu-name">${p.nama}</div>
              <a href="${p.cp}" target="_blank" class="pemandu-cp">Hubungi via WhatsApp</a>
            </div>
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

loadData();