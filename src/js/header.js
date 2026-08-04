export function initHeader() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Scroll listener for sticky header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  function toggleMenu() {
    mobileToggle?.classList.toggle('active');
    mobileDrawer?.classList.toggle('open');
    drawerOverlay?.classList.toggle('open');
    document.body.style.overflow = mobileDrawer?.classList.contains('open') ? 'hidden' : '';
  }

  mobileToggle?.addEventListener('click', toggleMenu);
  drawerOverlay?.addEventListener('click', toggleMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer?.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}
