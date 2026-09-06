export function initEstimator() {
  const estimatorCard = document.querySelector('.estimator-card');
  if (!estimatorCard) return;

  const categoryBtns = estimatorCard.querySelectorAll('[data-est-cat]');
  const urgencyBtns = estimatorCard.querySelectorAll('[data-est-urgency]');
  const scopeBtns = estimatorCard.querySelectorAll('[data-est-scope]');

  const resCategory = estimatorCard.querySelector('#est-res-category');
  const resUrgency = estimatorCard.querySelector('#est-res-urgency');
  const resTurnaround = estimatorCard.querySelector('#est-res-turnaround');
  const resProtocol = estimatorCard.querySelector('#est-res-protocol');

  const transferBtn = estimatorCard.querySelector('#est-transfer-btn');

  let state = {
    category: 'Corporate Investigation',
    categoryValue: 'corporate',
    urgency: 'Standard Assessment',
    scope: 'Comprehensive Intelligence',
    turnaround: '3 to 5 Business Days',
    protocol: 'Tier 2 — Executive Shielded NDA'
  };

  function updateActive(btnList, selectedBtn) {
    btnList.forEach(b => b.classList.remove('active'));
    selectedBtn.classList.add('active');
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateActive(categoryBtns, btn);
      state.category = btn.textContent.trim();
      state.categoryValue = btn.getAttribute('data-est-cat');
      recalculate();
    });
  });

  urgencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateActive(urgencyBtns, btn);
      state.urgency = btn.textContent.trim();
      recalculate();
    });
  });

  scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateActive(scopeBtns, btn);
      state.scope = btn.textContent.trim();
      recalculate();
    });
  });

  function recalculate() {
    if (state.urgency.includes('Expedited')) {
      state.turnaround = '24 to 48 Hours';
    } else if (state.urgency.includes('Immediate')) {
      state.turnaround = 'Within 12 Hours Priority';
    } else {
      state.turnaround = '3 to 5 Business Days';
    }

    if (state.scope.includes('Multi-Jurisdictional')) {
      state.protocol = 'Tier 3 — Maximum Security & Cross-Border Protocol';
    } else if (state.scope.includes('Basic')) {
      state.protocol = 'Tier 1 — Standard Encrypted Protocol';
    } else {
      state.protocol = 'Tier 2 — Executive Shielded NDA Protocol';
    }

    if (resCategory) resCategory.textContent = state.category;
    if (resUrgency) resUrgency.textContent = state.urgency;
    if (resTurnaround) resTurnaround.textContent = state.turnaround;
    if (resProtocol) resProtocol.textContent = state.protocol;
  }

  transferBtn?.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    const selectEl = document.querySelector('#form-service');
    const descEl = document.querySelector('#form-description');

    // Also prefill modal form if present
    const modalSelect = document.querySelector('#consultation-modal select[name="service"]');
    const modalDesc = document.querySelector('#consultation-modal textarea[name="description"]');

    const formattedDesc = `[Initial Scope Assessment Request]\nService: ${state.category}\nRequired Urgency: ${state.urgency}\nScope Tier: ${state.scope}\nProtocol: ${state.protocol}\n\nAdditional Context:\n`;

    if (selectEl) selectEl.value = state.categoryValue;
    if (descEl) descEl.value = formattedDesc;
    if (modalSelect) modalSelect.value = state.categoryValue;
    if (modalDesc) modalDesc.value = formattedDesc;

    contactSection?.scrollIntoView({ behavior: 'smooth' });

    // Show feedback toast
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <div class="toast-message">Scope configuration applied to consultation form!</div>
      `;
      toastContainer.appendChild(toast);
      setTimeout(() => toast.classList.add('show'), 80);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    }

    setTimeout(() => {
      descEl?.focus();
      const formCard = document.querySelector('.form-card');
      if (formCard) {
        formCard.style.outline = '2px solid var(--accent-gold)';
        formCard.style.outlineOffset = '4px';
        setTimeout(() => {
          formCard.style.outline = '';
          formCard.style.outlineOffset = '';
        }, 2200);
      }
    }, 700);
  });

  recalculate();
}
