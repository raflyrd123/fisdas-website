function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

const angkatanData = [
  { tahun: "2022/2023", gambar: "angkatan1.jpg" },
  { tahun: "2023/2024", gambar: "angkatan2.jpg" },
  { tahun: "2024/2025", gambar: "angkatan3.jpg" }
];


let currentAngkatan = 0;

const imgEl = document.getElementById('angkatan-image');
const overlayEl = document.getElementById('angkatan-overlay');
const dotsContainer = document.getElementById('angkatan-dots');

function renderAngkatan(index) {
  const data = angkatanData[index];
  imgEl.src = `/assets/img/angkatan/${data.gambar}`;
  overlayEl.textContent = `Angkatan ${data.tahun}`;

  document.querySelectorAll('#angkatan-dots span').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextAngkatan() {
  currentAngkatan = (currentAngkatan + 1) % angkatanData.length;
  renderAngkatan(currentAngkatan);
}

function prevAngkatan() {
  currentAngkatan = (currentAngkatan - 1 + angkatanData.length) % angkatanData.length;
  renderAngkatan(currentAngkatan);
}

// Buat dots
angkatanData.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.className = i === 0 ? 'active' : '';
  dot.onclick = () => {
    currentAngkatan = i;
    renderAngkatan(i);
  };
  dotsContainer.appendChild(dot);
});

renderAngkatan(currentAngkatan);
