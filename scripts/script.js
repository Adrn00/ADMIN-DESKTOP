const detailsModal = document.getElementById("detailsModal");
const updateModal = document.getElementById("updateModal");
const cancelModal = document.getElementById("cancelModal");
const suspendModal = document.getElementById("suspendModal");
const closeBtns = document.querySelectorAll(".close-btn");

// Open main details modal
document.querySelectorAll(".view-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-subscriber");
    document.getElementById("subscriberName").textContent = name;
    detailsModal.style.display = "flex";
  });
});

// Inner modals
document.querySelector(".update-btn").addEventListener("click", () => {
  updateModal.style.display = "flex";
});
document.querySelector(".cancel-btn").addEventListener("click", () => {
  cancelModal.style.display = "flex";
});
document.querySelector(".suspend-btn").addEventListener("click", () => {
  suspendModal.style.display = "flex";
});

// Close modals
closeBtns.forEach(btn => {
  btn.onclick = () => btn.closest(".modal").style.display = "none";
});

window.onclick = e => {
  document.querySelectorAll(".modal").forEach(m => {
    if (e.target === m) m.style.display = "none";
  });
};
