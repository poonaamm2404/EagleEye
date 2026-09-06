export function initHeader() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileModalBtns = mobileDrawer?.querySelectorAll('[data-open-modal]');

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
    const willOpen = !mobileDrawer?.classList.contains('open');
    mobileToggle?.classList.toggle('active', willOpen);
    mobileDrawer?.classList.toggle('open', willOpen);
    drawerOverlay?.classList.toggle('open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
    document.body.style.overflow = willOpen ? 'hidden' : '';
  }

  mobileToggle?.addEventListener('click', toggleMenu);
  drawerOverlay?.addEventListener('click', toggleMenu);
  drawerCloseBtn?.addEventListener('click', toggleMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer?.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  mobileModalBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      if (mobileDrawer?.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Nav link click active state
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Scroll spy to highlight active section in navbar
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 140;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

