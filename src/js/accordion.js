export function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all active items
      faqItems.forEach(el => el.classList.remove('active'));

      // If it was not active before, activate it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
