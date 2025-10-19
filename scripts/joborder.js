// scripts/joborders.js
document.addEventListener('DOMContentLoaded', () => {
  // Buttons and dialogs
  const archiveBtn = document.getElementById('archiveBtn');
  const archiveDialog = document.getElementById('archiveDialog');

  const createOrderBtn = document.getElementById('createOrderBtn');
  const createOrderDialog = document.getElementById('createOrderDialog');
  const createOrderForm = document.getElementById('createOrderForm');

  const viewDetailDialog = document.getElementById('viewDetailDialog');
  const editDialog = document.getElementById('editDialog');
  const editForm = document.getElementById('editForm');

  const assignDialog = document.getElementById('assignDialog');
  const assignForm = document.getElementById('assignForm');

  // Open/close archive
  archiveBtn.addEventListener('click', () => {
    archiveDialog.showModal();
  });

  // Create order
  createOrderBtn.addEventListener('click', () => {
    createOrderDialog.showModal();
  });

  // Disable/enable manual technician select on create
  const autoAssignCreate = document.getElementById('autoAssignCreate');
  const manualTechCreate = document.getElementById('manualTechCreate');
  if (autoAssignCreate && manualTechCreate) {
    autoAssignCreate.addEventListener('change', (e) => {
      manualTechCreate.disabled = e.target.checked;
    });
  }

  // Assignment toggle
  const autoAssignAssign = document.getElementById('autoAssignAssign');
  const manualTechAssign = document.getElementById('manualTechAssign');
  if (autoAssignAssign && manualTechAssign) {
    autoAssignAssign.addEventListener('change', (e) => {
      manualTechAssign.disabled = e.target.checked;
    });
  }

  // Table action buttons (View Details / Assign)
  document.querySelectorAll('.jobs-table tbody tr').forEach(row => {
    const viewBtn = row.querySelector('.view-detail');
    const assignBtn = row.querySelector('.assign-tech');

    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        const data = JSON.parse(row.getAttribute('data-job'));
        // populate view dialog fields
        document.getElementById('detail_jobid').textContent = data.id || '';
        document.getElementById('detail_type').textContent = data.type || '';
        document.getElementById('detail_status').textContent = data.status || '';
        document.getElementById('detail_customer').textContent = data.customer || '';
        document.getElementById('detail_address').textContent = data.address || '';
        document.getElementById('detail_date').textContent = data.requested || '';
        document.getElementById('detail_assign_status').textContent = data.tech && data.tech !== '—' ? data.tech : 'Not assigned';

        viewDetailDialog.showModal();

        // link open edit from view
        const openEdit = document.getElementById('openEditFromView');
        openEdit.onclick = () => {
          // prefill edit form
          document.getElementById('edit_jobid').value = data.id || '';
          document.getElementById('edit_customer').value = data.customer || '';
          document.getElementById('edit_type').value = data.type || '';
          document.getElementById('edit_status').value = data.status || '';
          document.getElementById('edit_address').value = data.address || '';
          // format requested date to yyyy-mm-dd if possible
          try {
            const parts = (data.requested || '').split('/');
            if (parts.length === 3) {
              // expecting mm/dd/yyyy or mm/dd/yy -> attempt convert to yyyy-mm-dd
              const mm = parts[0].padStart(2, '0');
              const dd = parts[1].padStart(2, '0');
              const yy = parts[2].length === 2 ? '20' + parts[2] : parts[2];
              document.getElementById('edit_date').value = `${yy}-${mm}-${dd}`;
            } else {
              document.getElementById('edit_date').value = '';
            }
          } catch (err) { document.getElementById('edit_date').value = ''; }

          viewDetailDialog.close();
          editDialog.showModal();
        };
      });
    }

    if (assignBtn) {
      assignBtn.addEventListener('click', () => {
        // open assign dialog; optionally prefill with job id
        assignDialog.showModal();
      });
    }
  });

  // Create order submit (demo: just close and console log)
  createOrderForm && createOrderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // gather minimal demo data
    const formData = new FormData(createOrderForm);
    console.log('Create Order:', Object.fromEntries(formData.entries()));
    createOrderDialog.close();
    alert('Order created (demo). In production, send to server.');
  });

  // Edit form submit
  editForm && editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(editForm);
    console.log('Edit Job:', Object.fromEntries(formData.entries()));
    editDialog.close();
    alert('Job updated (demo). In production, update via API.');
  });

  // Assign form submit
  assignForm && assignForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(assignForm);
    console.log('Assign Tech:', Object.fromEntries(formData.entries()));
    assignDialog.close();
    alert('Technician assigned (demo). In production, update via API.');
  });

  // Reset assign form (demo behavior)
  const assignReset = document.getElementById('assignReset');
  if (assignReset) {
    assignReset.addEventListener('click', (e) => {
      e.preventDefault();
      assignForm.reset();
      // enable manual select if auto unchecked
      document.getElementById('manualTechAssign').disabled = document.getElementById('autoAssignAssign').checked;
    });
  }

});
