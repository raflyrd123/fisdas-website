function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

const divisiList = [
  {
    gambar: "/assets/img/organigram/edu.jpg",
    deskripsi: "Divisi Edukasi"
  },
  {
    gambar: "/assets/img/organigram/msi.jpg",
    deskripsi: "Divisi Manajemen Sistem Informasi"
  },
  {
    gambar: "/assets/img/organigram/praktikum.jpg",
    deskripsi: "Divisi Praktikum"
  },
  {
    gambar: "/assets/img/organigram/rnb.jpg",
    deskripsi: "Divisi Riset dan Bengkel"
  },
  {
    gambar: "/assets/img/organigram/sdm.jpg",
    deskripsi: "Divisi Sumber Daya Manusia"
  }
];

let currentDivisi = 0;
const imgEl = document.getElementById("organigram-image");
const descEl = document.getElementById("organigram-desc");
const dotsContainer = document.getElementById("organigram-dots");

function renderDivisi(index) {
  const data = divisiList[index];
  imgEl.src = data.gambar;
  descEl.textContent = data.deskripsi;

  document.querySelectorAll("#organigram-dots span").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextDivisi() {
  currentDivisi = (currentDivisi + 1) % divisiList.length;
  renderDivisi(currentDivisi);
}

function prevDivisi() {
  currentDivisi = (currentDivisi - 1 + divisiList.length) % divisiList.length;
  renderDivisi(currentDivisi);
}

function switchDivisi(index) {
  currentDivisi = index;
  renderDivisi(index);
}

// Init Dots
divisiList.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = i === 0 ? "active" : "";
  dot.onclick = () => {
    currentDivisi = i;
    renderDivisi(i);
  };
  dotsContainer.appendChild(dot);
});

// Initial Load
renderDivisi(currentDivisi);
