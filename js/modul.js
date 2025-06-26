function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

function openModal(type) {
  const modal = document.getElementById("modulModal");
  const title = document.getElementById("modal-title");
  const linkIndo = document.getElementById("link-indo");
  const linkEnglish = document.getElementById("link-english");

  if (type === "FTE") {
    title.textContent = "Modul Praktikum - FTE";
    linkIndo.href = "https://drive.google.com/your-fte-indo";
    linkEnglish.href = "https://drive.google.com/your-fte-english";
  } else if (type === "FRI") {
    title.textContent = "Modul Praktikum - FRI";
    linkIndo.href = "https://drive.google.com/your-fri-indo";
    linkEnglish.href = "https://drive.google.com/your-fri-english";
  }

  modal.classList.remove("hidden");
}


function closeModal() {
  document.getElementById("modulModal").classList.add("hidden");
}

// Tutup modal saat klik di luar box
document.getElementById("modulModal").addEventListener("click", function(e) {
  if (e.target === this) {
    closeModal();
  }
});
