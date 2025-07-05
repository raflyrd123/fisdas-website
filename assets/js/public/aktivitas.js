function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

// File: /assets/js/public/aktivitas.js

const kegiatanList = [
  { nama: 'ToT', folder: 'tot' },
  { nama: 'Kalibrasi', folder: 'kalibrasi' },
  { nama: 'Running Module', folder: 'runmod' },
  { nama: 'Praktikum Fisika Dasar I & II', folder: 'praktikum' },
  { nama: 'Upgrading', folder: 'upgrading' },
  { nama: 'Responsi UTS & UAS', folder: 'responsi' },
  { nama: 'Workshop & Webinar', folder: 'workshop' },
  { nama: 'Open Recruitment', folder: 'oprec' }
];

// Tampilkan loading dulu, lalu render setelah 1 detik
setTimeout(() => {
  renderAktivitas();
}, 1000);

function renderAktivitas() {
  const aktivitasContainer = document.getElementById('aktivitasContainer');
  const loading = document.querySelector('.loading-aktivitas');
  if (loading) loading.remove();

  kegiatanList.forEach(({ nama, folder }) => {
    const carousel = document.createElement('div');
    carousel.className = 'carousel-aktivitas';

    const overlay = `<div class="overlay-aktivitas">${nama}</div>`;

    const imagesHTML = [];
    const dotsHTML = [];

    let jumlahSlide = 0;

    for (let i = 1; i <= 10; i++) {
      ['jpg', 'png'].forEach(ext => {
        const path = `/assets/img/aktivitas/${folder}/${folder}${i}.${ext}`;
        const img = new Image();
        img.src = path;
        img.onload = () => {
          const isFirst = jumlahSlide === 0;
          imagesHTML.push(`
            <img src="${path}" class="${isFirst ? 'active' : ''}" alt="${nama}">
            ${isFirst ? overlay : ''}
          `);
          dotsHTML.push(`<span class="${isFirst ? 'active' : ''}" onclick="goToSlide(this, ${jumlahSlide})"></span>`);
          jumlahSlide++;

          if (jumlahSlide === 1) {
            carousel.innerHTML = `
              ${imagesHTML.join('')}
              <div class="carousel-nav">
                <button onclick="prevSlide(this)">‹</button>
                <button onclick="nextSlide(this)">›</button>
              </div>
              <div class="carousel-dots">
                ${dotsHTML.join('')}
              </div>
            `;
            aktivitasContainer.appendChild(carousel);
          } else {
            const track = carousel.querySelector('.carousel-nav');
            carousel.insertBefore(document.createRange().createContextualFragment(imagesHTML[imagesHTML.length - 1]), track);
            carousel.querySelector('.carousel-dots').innerHTML = dotsHTML.join('');
          }
        };
      });
    }
  });
}

function nextSlide(btn) {
  const carousel = btn.closest('.carousel-aktivitas');
  const imgs = carousel.querySelectorAll('img');
  const dots = carousel.querySelectorAll('.carousel-dots span');
  let index = [...imgs].findIndex(img => img.classList.contains('active'));

  imgs[index].classList.remove('active');
  dots[index].classList.remove('active');

  index = (index + 1) % imgs.length;

  imgs[index].classList.add('active');
  dots[index].classList.add('active');
}

function prevSlide(btn) {
  const carousel = btn.closest('.carousel-aktivitas');
  const imgs = carousel.querySelectorAll('img');
  const dots = carousel.querySelectorAll('.carousel-dots span');
  let index = [...imgs].findIndex(img => img.classList.contains('active'));

  imgs[index].classList.remove('active');
  dots[index].classList.remove('active');

  index = (index - 1 + imgs.length) % imgs.length;

  imgs[index].classList.add('active');
  dots[index].classList.add('active');
}

function goToSlide(dot, i) {
  const carousel = dot.closest('.carousel-aktivitas');
  const imgs = carousel.querySelectorAll('img');
  const dots = carousel.querySelectorAll('.carousel-dots span');

  imgs.forEach(img => img.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  imgs[i].classList.add('active');
  dots[i].classList.add('active');
}
