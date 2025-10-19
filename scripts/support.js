const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".ticket-list");

// --- Populate "All" tab dynamically ---
const allTab = document.getElementById("all");
allTab.innerHTML = ""; // Clear any static placeholder text

// Get all tickets from other tabs
document.querySelectorAll(".ticket-list:not(#all) .ticket-card").forEach(ticket => {
  const clone = ticket.cloneNode(true);
  allTab.appendChild(clone);
});

// --- Tab switching logic ---
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.tab;

    // Show only the selected tab content
    tabContents.forEach(content => {
      content.classList.remove("active");
      if (content.id === target) {
        content.classList.add("active");
      }
    });
  });
});

// --- Modal handling ---
const modal = document.getElementById("ticketModal");
const closeModal = document.getElementById("closeModal");

// Use event delegation for dynamic tickets (like clones)
document.body.addEventListener("click", e => {
  if (e.target.classList.contains("view-btn")) {
    modal.showModal();
  }
});

closeModal.addEventListener("click", () => modal.close());
