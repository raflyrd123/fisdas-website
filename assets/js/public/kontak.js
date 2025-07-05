function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

function filterAsisten(role = 'all') {
  const searchInput = document.getElementById("searchAsisten");
  const searchValue = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.asisten-card');
  const buttons = document.querySelectorAll('.filter-btn');

  // Reset semua tombol ke non-aktif
  buttons.forEach(btn => btn.classList.remove('active'));

  // Jika search aktif, paksa role ke 'all'
  if (searchValue.trim() !== '') {
    role = 'all';
  }

  // Aktifkan tombol sesuai kategori
  document.querySelector(`.filter-btn[onclick*="${role}"]`)?.classList.add('active');

  // Filter kartu berdasarkan nama, kode, ID Line, dan kategori
  cards.forEach(card => {
    const nama = card.querySelector('.asisten-nama')?.textContent.toLowerCase() || '';
    const kode = card.querySelector('.asisten-kode')?.textContent.toLowerCase() || '';
    const line = card.querySelector('.line-id')?.textContent.toLowerCase() || '';
    const jenis = card.classList.contains('senior') ? 'senior' : 'junior';

    const cocok = nama.includes(searchValue) || kode.includes(searchValue) || line.includes(searchValue);
    const kategori = role === 'all' || jenis === role;

    card.style.display = cocok && kategori ? 'block' : 'none';
  });
}
