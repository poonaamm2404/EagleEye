// Interactive Brand Identity Showcase Controller

export function initBrandShowcase() {
  const tabButtons = document.querySelectorAll('.brand-tab-btn');
  const tabContents = document.querySelectorAll('.brand-tab-content');

  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update Active Tab Button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Active Content Panel
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
}
