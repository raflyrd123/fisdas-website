function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

function filterCards(input) {
  const filter = input.value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const kode = card.querySelector('.kode')?.textContent.toLowerCase() || '';
    const judul = card.querySelector('.judul')?.textContent.toLowerCase() || '';
    const visible = kode.includes(filter) || judul.includes(filter);
    card.style.display = visible ? 'block' : 'none';
  });
}


