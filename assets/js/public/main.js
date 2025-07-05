function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

const images = [
  "/assets/img/homepage/foto-praktikum.png",
  "/assets/img/homepage/foto-praktikum2.png",
  "/assets/img/homepage/foto-praktikum3.png"
];
let currentIndex = 0;
let interval;

function showImage(index) {
  const img = document.getElementById("carousel-image");
  const dots = document.querySelectorAll(".carousel-dots .dot");

  img.style.opacity = 0;
  setTimeout(() => {
    img.src = images[index];
    img.style.opacity = 1;

    // Update active dot
    if (dots.length > 0) {
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }
  }, 150);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

function startCarousel() {
  const dotsContainer = document.getElementById("carousel-dots");
  images.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      showImage(currentIndex);
    });
    dotsContainer.appendChild(dot);
  });

  interval = setInterval(nextImage, 6000); // autoplay every 4s
}

document.addEventListener("DOMContentLoaded", () => {
  showImage(currentIndex); // initial image
  startCarousel();
});

