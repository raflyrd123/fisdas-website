function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("hidden");
}
const imageData = {
  "Praktikum Fisika Dasar I & II": [
    "assets/kegiatan/praktikum/praktikum1.png",
    "assets/kegiatan/praktikum/praktikum2.png"
  ],
  "Trainning of Trainners": [
    "assets/kegiatan/tot/tot1.png",
    "assets/kegiatan/tot/tot2.png"
  ],
  "Workshop & Sharing Session": [
    "assets/kegiatan/workshop/workshop1.png",
    "assets/kegiatan/workshop/workshop2.png"
  ]
};

let currentIndex = {};

function getTitleFromBlock(element) {
  return element.closest('.activity-block').querySelector('.activity-title').innerText.trim();
}

function updateImage(btn, title) {
  const block = btn.closest('.carousel');
  const img = block.querySelector('.carousel-image');
  const dots = block.querySelectorAll('.carousel-dots .dot');

  img.style.opacity = 0;

  setTimeout(() => {
    img.src = imageData[title][currentIndex[title]];
    img.style.opacity = 1;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex[title]);
    });
  }, 150);
}

function prevImage(btn) {
  const title = getTitleFromBlock(btn);
  currentIndex[title] = (currentIndex[title] ?? 0) - 1;
  if (currentIndex[title] < 0) {
    currentIndex[title] = imageData[title].length - 1;
  }
  updateImage(btn, title);
}

function nextImage(btn) {
  const title = getTitleFromBlock(btn);
  currentIndex[title] = (currentIndex[title] ?? 0) + 1;
  if (currentIndex[title] >= imageData[title].length) {
    currentIndex[title] = 0;
  }
  updateImage(btn, title);
}

// Inisialisasi dots setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".activity-block").forEach(block => {
    const title = block.querySelector(".activity-title").innerText.trim();
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("carousel-dots");

    imageData[title].forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex[title] = i;
        const btn = block.querySelector(".carousel-btn"); // ambil tombol acak dalam blok
        updateImage(btn, title);
      });
      dotsContainer.appendChild(dot);
    });

    block.querySelector(".carousel").appendChild(dotsContainer);
    currentIndex[title] = 0;
  });
});
