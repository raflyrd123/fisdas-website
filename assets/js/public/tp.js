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

function checkEmptyTP() {
  const cards = document.querySelectorAll('#modulCards .card');
  const msg = document.getElementById('no-tp-message');
  if (cards.length === 0) {
    msg.classList.remove('hidden');
  } else {
    msg.classList.add('hidden');
  }
}

window.onload = checkEmptyTP;


