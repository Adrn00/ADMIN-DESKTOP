// subscription.js

document.addEventListener('DOMContentLoaded', () => {
  const clientListEl = document.getElementById('clientList');
  const rows = Array.from(clientListEl.querySelectorAll('.client-row'));
  const leftSearch = document.getElementById('leftSearch');
  const statusFilter = document.getElementById('statusFilter');
  const totalCount = document.getElementById('totalCount');

  // subscriber details elements
  const detailName = document.getElementById('detailName');
  const detailIdEmail = document.getElementById('detailIdEmail');
  const cardBalance = document.getElementById('cardBalance');
  const cardActivePlan = document.getElementById('cardActivePlan');
  const cardBilling = document.getElementById('cardBilling');
  const cardStatus = document.getElementById('cardStatus');
  const historyTableBody = document.querySelector('#historyTable tbody');

  // action buttons & modals
  const addPlanBtn = document.getElementById('addPlanBtn');
  const plansModal = document.getElementById('plansModal');
  const closePlansModal = document.getElementById('closePlansModal');

  const cancelPlanBtn = document.getElementById('cancelPlanBtn');
  const cancelSuccessModal = document.getElementById('cancelSuccessModal');
  const closeCancelSuccess = document.getElementById('closeCancelSuccess');
  const cancelNameEl = document.getElementById('cancelName');

  const updatePlanBtn = document.getElementById('updatePlanBtn');
  const updateModalLarge = document.getElementById('updateModalLarge');
  const closeUpdateModal = document.getElementById('closeUpdateModal');
  const updateNameInput = document.getElementById('updateName');
  const updatePlanSelect = document.getElementById('updatePlanSelect');

  const updateSave = document.getElementById('updateSave');
  const updateCancel = document.getElementById('updateCancel');

  // Helper: show/hide modal
  function showModal(modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
  }
  function hideModal(modal) {
    modal.style.display = 'none';
    modal.classList.remove('open');
  }

  // Update total count
  function refreshTotalCount() {
    const visible = rows.filter(r => r.style.display !== 'none');
    totalCount.textContent = visible.length;
  }

  // Filter function (by search + status)
  function filterList() {
    const q = leftSearch.value.trim().toLowerCase();
    const status = statusFilter.value; // all / active / suspended

    rows.forEach(row => {
      const name = row.querySelector('.client-name').textContent.toLowerCase();
      const id = row.dataset.id.toLowerCase();
      const rowStatus = row.dataset.status.toLowerCase();

      let matchesSearch = true;
      if (q.length) {
        matchesSearch = name.includes(q) || id.includes(q);
      }

      let matchesStatus = true;
      if (status !== 'all') {
        matchesStatus = (status === 'active') ? rowStatus === 'active' : rowStatus === 'suspended';
      }

      row.style.display = (matchesSearch && matchesStatus) ? 'flex' : 'none';
    });

    refreshTotalCount();
  }

  leftSearch.addEventListener('input', filterList);
  statusFilter.addEventListener('change', filterList);

  // Select client row to populate details
  rows.forEach(row => {
    row.addEventListener('click', () => {
      // Remove highlight
      rows.forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');

      const id = row.dataset.id;
      const name = row.querySelector('.client-name').textContent;
      const plan = row.querySelector('.client-plan').textContent;
      const status = row.dataset.status;

      // Populate details area (in real app you'd fetch from backend)
      detailName.textContent = name;
      detailIdEmail.textContent = `ID: ${id} • ${name.toLowerCase().replace(' ','.')}@example.com`;
      cardBalance.textContent = '₱150.00';
      cardActivePlan.textContent = plan;
      cardBilling.textContent = plan.includes('Platinum') ? '₱1,500 / month' : '₱800 / month';
      cardStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1);

      // Example history rows (mock data)
      historyTableBody.innerHTML = '';
      const today = new Date();
      const rowsData = [
        {d: '2025-10-01', plan: plan, billing: '₱800', current: '₱150', total: '₱950', s: 'Paid'},
        {d: '2025-09-01', plan: plan, billing: '₱800', current: '₱0', total: '₱0', s: 'Paid'},
        {d: '2025-08-01', plan: plan, billing: '₱800', current: '₱50', total: '₱50', s: status === 'suspended' ? 'Suspended' : 'Paid'}
      ];
      rowsData.forEach(rw => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${rw.d}</td><td>${rw.plan}</td><td>${rw.billing}</td><td>${rw.current}</td><td>${rw.total}</td><td>${rw.s}</td>`;
        historyTableBody.appendChild(tr);
      });

      // enable action buttons
      cancelPlanBtn.disabled = false;
      suspendPlanBtn && (suspendPlanBtn.disabled = false);
      updatePlanBtn.disabled = false;
    });
  });

  // Open/close Plans modal
  addPlanBtn.addEventListener('click', () => showModal(plansModal));
  closePlansModal && closePlansModal.addEventListener('click', () => hideModal(plansModal));
  plansModal.addEventListener('click', (e) => { if (e.target === plansModal) hideModal(plansModal); });

  // Cancel Plan -> show cancel success modal with name
  cancelPlanBtn.addEventListener('click', () => {
    const name = detailName.textContent || '-';
    cancelNameEl.textContent = name;
    showModal(cancelSuccessModal);
  });
  closeCancelSuccess.addEventListener('click', () => hideModal(cancelSuccessModal));
  cancelSuccessModal.addEventListener('click', (e) => { if (e.target === cancelSuccessModal) hideModal(cancelSuccessModal); });

  // Update Plan modal flow
  updatePlanBtn.addEventListener('click', () => {
    // populate fields with current selected
    updateNameInput.value = detailName.textContent || '';
    const currentPlan = cardActivePlan.textContent || 'Gold';
    // select matching option
    for (let i=0;i<updatePlanSelect.options.length;i++){
      if (updatePlanSelect.options[i].value === currentPlan.split(' ')[0]) {
        updatePlanSelect.selectedIndex = i; break;
      }
    }
    showModal(updateModalLarge);
  });
  closeUpdateModal.addEventListener('click', () => hideModal(updateModalLarge));
  updateCancel.addEventListener('click', () => hideModal(updateModalLarge));
  updateSave.addEventListener('click', () => {
    // apply changes to UI (mock). In real app, POST to backend then refresh.
    cardActivePlan.textContent = updatePlanSelect.options[updatePlanSelect.selectedIndex].text;
    cardBilling.textContent = updatePlanSelect.options[updatePlanSelect.selectedIndex].text.includes('₱') ?
      updatePlanSelect.options[updatePlanSelect.selectedIndex].text.split(' ')[1] : cardBilling.textContent;
    hideModal(updateModalLarge);
    alert('Saved (mock) — integrate your backend API here.');
  });
  updateModalLarge.addEventListener('click', (e) => { if (e.target === updateModalLarge) hideModal(updateModalLarge); });

  // initial count
  refreshTotalCount();

  // enable suspendPlanBtn variable (wired earlier may be undefined if element missing)
  // find suspendPlanBtn by id used in markup
  window.suspendPlanBtn = document.getElementById('suspendPlanBtn');

  // if you want backend wiring: replace the mock parts with fetch/ajax calls to your server endpoints
});
// Add New Plan Modal Toggle
const openAddPlanModal = document.getElementById("openAddPlanModal");
const addPlanModal = document.getElementById("addPlanModal");
const closeAddPlanModal = document.getElementById("closeAddPlanModal");
const cancelAddPlan = document.getElementById("cancelAddPlan");

openAddPlanModal.addEventListener("click", () => {
  addPlanModal.style.display = "block";
});

[closeAddPlanModal, cancelAddPlan].forEach(btn => {
  btn.addEventListener("click", () => {
    addPlanModal.style.display = "none";
  });
});

// (optional) handle saving
document.getElementById("savePlan").addEventListener("click", () => {
  const name = document.getElementById("planName").value.trim();
  const price = document.getElementById("planPrice").value.trim();
  const features = document.getElementById("planFeatures").value.trim();

  if (!name || !price) {
    alert("Please fill in all required fields.");
    return;
  }

  // Future: send data to backend via fetch or IPC
  console.log({ name, price, features });
  addPlanModal.style.display = "none";
});
