import '../styles/main.css';
import '../styles/header.css';
import '../styles/hero.css';
import '../styles/services.css';
import '../styles/process.css';
import '../styles/sections.css';
import '../styles/contact.css';
import '../styles/modal.css';

import { initHeader } from './header.js';
import { initTimeline } from './timeline.js';
import { initModal } from './modal.js';
import { initAccordion } from './accordion.js';
import { initForm } from './form.js';
import { initEstimator } from './estimator.js';

function initPreloader() {
  const preloader = document.getElementById('app-preloader');
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add('fade-out');
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeader();
  initTimeline();
  initModal();
  initAccordion();
  initForm();
  initEstimator();
});
