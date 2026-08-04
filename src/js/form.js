export function initForm() {
  const forms = document.querySelectorAll('form');
  const toastContainer = document.getElementById('toast-container');
  const confirmationModal = document.getElementById('confirmation-modal');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const checkbox = form.querySelector('input[type="checkbox"]');
      if (checkbox && !checkbox.checked) {
        showToast("Please acknowledge the confidentiality and usage terms checkbox before submitting.");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Request';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="width:18px; height:18px; animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2 a 10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
          Encrypting & Submitting...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        // Close any open consultation modal
        const consultationModal = document.getElementById('consultation-modal');
        consultationModal?.classList.remove('active');

        // Generate Case Reference ID
        const refId = `EE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        // Show Confirmation Dialog Modal if present
        if (confirmationModal) {
          const refEl = confirmationModal.querySelector('#conf-ref-id');
          if (refEl) refEl.textContent = refId;
          confirmationModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else {
          showToast(`Request submitted securely under Ref ${refId}. A Senior Case Officer will contact you confidentially.`);
        }

        form.reset();
      }, 1200);
    });
  });

  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <div class="toast-message">${message}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }
}
