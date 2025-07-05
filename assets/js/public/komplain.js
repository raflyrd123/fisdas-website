function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('komplainForm');
  const masalahSelect = document.getElementById('masalah');
  const ketidaksesuaianFields = document.getElementById('ketidaksesuaianFields');
  const belumInputFields = document.getElementById('belumInputFields');

  masalahSelect.addEventListener('change', function () {
    if (this.value === 'ketidaksesuaian') {
      ketidaksesuaianFields.classList.remove('hidden');
      belumInputFields.classList.add('hidden');
    } else if (this.value === 'belum_diinput') {
      belumInputFields.classList.remove('hidden');
      ketidaksesuaianFields.classList.add('hidden');
    } else {
      ketidaksesuaianFields.classList.add('hidden');
      belumInputFields.classList.add('hidden');
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      nama: document.getElementById('nama').value,
      nim: document.getElementById('nim').value,
      nomor_kontak: document.getElementById('nomor_kontak').value,
      jurusan: document.getElementById('jurusan').value,
      kelas: document.getElementById('kelas').value,
      kelompok: document.getElementById('kelompok').value,
      hari_shift: document.getElementById('hari_shift').value,
      masalah: document.getElementById('masalah').value,
      minggu: '',
      kode_asisten: '',
      deskripsi: '',
      link_bukti: '',
      semua_belum: ''
    };

    if (data.masalah === 'ketidaksesuaian') {
      data.minggu = document.getElementById('minggu_ketidaksesuaian').value;
      data.kode_asisten = document.getElementById('asisten_ketidaksesuaian').value;
      data.deskripsi = document.getElementById('deskripsi_masalah').value;
      data.link_bukti = document.getElementById('link_bukti').value;
    } else if (data.masalah === 'belum_diinput') {
      data.minggu = document.getElementById('minggu_belum').value;
      data.kode_asisten = document.getElementById('asisten_belum').value;
      data.semua_belum = document.getElementById('semua_belum_diinput').value;
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxAQr3koIv63lPXDdtlwBDmFPaXP8zyEbAaykHA7ywGSS6xR8Jr63If-6im3rfSYT0/exec';

    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        alert("Komplain berhasil dikirim!");
        form.reset();
        ketidaksesuaianFields.classList.add('hidden');
        belumInputFields.classList.add('hidden');
      })
      .catch((err) => {
        alert("Gagal mengirim. Silakan coba lagi.");
        console.error('Fetch error:', err);
      });
  });
});