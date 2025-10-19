
// Open and close bill modal
const billModal = document.getElementById("billModal");
const recordModal = document.getElementById("recordModal");
const closeModal = document.getElementById("closeModal");
const closeRecord = document.getElementById("closeRecord");

document.querySelectorAll(".client-item").forEach(item => {
  item.addEventListener("click", () => {
    billModal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => billModal.style.display = "none");
closeRecord.addEventListener("click", () => recordModal.style.display = "none");
// Record partial button
document.querySelector(".btn.record").addEventListener("click", () =>
  { billModal.style.display = "none"; recordModal.style.display = "flex"; });


document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const clientItems = Array.from(document.querySelectorAll('.client-item'));
  const searchInput = document.querySelector('.search-bar input');

  // Optional modal references (only used if you have these elements)
  const billModal = document.getElementById('billModal');
  const recordModal = document.getElementById('recordModal');

  // Ensure there is at least one tab
  if (!tabs.length || !clientItems.length) return;

  // Helper: show/hide items based on current tab + search query
  function filterList(selectedTab = 'all', q = '') {
    const qi = (q || '').toLowerCase().trim();

    clientItems.forEach(item => {
      const status = (item.dataset.status || '').toLowerCase(); // e.g. "due", "pending", "paid", "overdue"
      const clientText = (item.textContent || '').toLowerCase();

      // Tab-matching rules:
      // - 'all' shows everything
      // - 'paid' shows status === 'paid'
      // - 'overdue' shows status === 'overdue'
      // - 'pending' shows status === 'pending' OR status === 'due' (treat due as upcoming)
      let matchesTab = false;
      if (selectedTab === 'all') matchesTab = true;
      else if (selectedTab === 'paid') matchesTab = status === 'paid';
      else if (selectedTab === 'overdue') matchesTab = status === 'overdue';
      else if (selectedTab === 'pending') matchesTab = status === 'pending' || status === 'due';
      else matchesTab = status === selectedTab;

      // Query match: check name, email, id and other text in the item
      const matchesQuery = !qi || clientText.includes(qi);

      item.style.display = (matchesTab && matchesQuery) ? 'flex' : 'none';
    });
  }

  // Activate tab and re-filter
  function activateTab(tabEl) {
    const selected = tabEl.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    tabEl.classList.add('active');
    filterList(selected, searchInput ? searchInput.value : '');
  }

  // Wire up tab click events
  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
    // keyboard accessibility: Enter/Space toggles
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(tab);
      }
    });
  });

  // Wire up search input (if present)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeTab = document.querySelector('.tab.active')?.dataset.tab || 'all';
      filterList(activeTab, e.target.value);
    });
  }

  // Optionally open bill modal when clicking a client item
  clientItems.forEach(item => {
    item.addEventListener('click', () => {
      // If you have a billModal element, show it
      if (billModal) billModal.style.display = 'flex';
      // You can populate modal fields here based on the clicked item:
      // const clientName = item.querySelector('.client-info h4')?.textContent;
      // document.getElementById('billClient').textContent = clientName;
    });
  });

  // Close modals by clicking outside (optional)
  [billModal, recordModal].forEach(m => {
    if (!m) return;
    m.addEventListener('click', (e) => {
      if (e.target === m) m.style.display = 'none';
    });
  });

  // Initialize — show "all"
  const initialTab = document.querySelector('.tab.active') || tabs[0];
  if (initialTab) activateTab(initialTab);
});

// --- CREATE BILL LOGIC ---
const createBillBtn = document.querySelector(".create-bill-btn");
const createBillModal = document.getElementById("createBillModal");
const closeCreateBill = document.getElementById("closeCreateBill");
const cancelCreateBill = document.getElementById("cancelCreateBill");

createBillBtn.addEventListener("click", () => {
  createBillModal.style.display = "flex";
});

closeCreateBill.addEventListener("click", () => {
  createBillModal.style.display = "none";
});

cancelCreateBill.addEventListener("click", () => {
  createBillModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === createBillModal) {
    createBillModal.style.display = "none";
  }
});
