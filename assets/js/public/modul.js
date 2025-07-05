function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("hidden");
}

function openModal(type) {
  const modal = document.getElementById("modulModal");
  const title = document.getElementById("modal-title");
  const linkIndo = document.getElementById("link-indo");
  const linkEnglish = document.getElementById("link-english");

  if (type === "FTE_FD1") {
    title.textContent = "Modul Praktikum - FTE (Fisika Dasar I)";
    linkIndo.href = "https://drive.google.com/file/d/FTE_FD1_ID/view";
    linkEnglish.href = "https://drive.google.com/file/d/FTE_FD1_EN/view";
  } else if (type === "FRI_FD1") {
    title.textContent = "Modul Praktikum - FRI (Fisika Dasar I)";
    linkIndo.href = "https://drive.google.com/file/d/FRI_FD1_ID/view";
    linkEnglish.href = "https://drive.google.com/file/d/FRI_FD1_EN/view";
  } else if (type === "FTE_FD2") {
    title.textContent = "Modul Praktikum - FTE (Fisika Dasar II)";
    linkIndo.href = "https://drive.google.com/file/d/FTE_FD2_ID/view";
    linkEnglish.href = "https://drive.google.com/file/d/FTE_FD2_EN/view";
  }

  modal.classList.remove("hidden");
}


function closeModal() {
  document.getElementById("modulModal").classList.add("hidden");
}

document.getElementById("modulModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});
