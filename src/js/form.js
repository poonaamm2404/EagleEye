import { API_BASE_URL } from './config.js';

export function initForm() {
  const forms = document.querySelectorAll('form:not(#chat-form)');
  const toastContainer = document.getElementById('toast-container');
  const confirmationModal = document.getElementById('confirmation-modal');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
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

      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`${API_BASE_URL}/api/consultations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          // Close any open consultation modal
          const consultationModal = document.getElementById('consultation-modal');
          consultationModal?.classList.remove('active');

          // Show Confirmation Dialog Modal if present
          if (confirmationModal) {
            const refEl = confirmationModal.querySelector('#conf-ref-id');
            // Use ID from DB if possible, else fallback
            const refId = result.data?._id?.substring(result.data._id.length - 6) || 'EE-2026-OK';
            if (refEl) refEl.textContent = 'EE-REF-' + refId.toUpperCase();
            confirmationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          } else {
            showToast(result.message || "Request submitted securely. A Senior Case Officer will contact you confidentially.");
          }

          form.reset();
        } else {
          showToast(result.message || "An error occurred during submission.");
        }
      } catch (error) {
        console.error('Submission error:', error);
        showToast("Network error. Please ensure the backend server is running.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
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
