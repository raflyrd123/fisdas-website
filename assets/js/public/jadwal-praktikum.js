  function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("hidden");
  }

  function openModal(src) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImage");
    modal.classList.remove("hidden");
    modalImg.src = src;
  }

  function closeModal() {
    document.getElementById("imgModal").classList.add("hidden");
  }