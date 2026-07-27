/**
 * EDOERS Master JavaScript Entry Point
 * Modern ES2025 Modules Architecture
 */

import { initThemeEngine } from './theme.js';
import { initLenisScroll } from './lenis-scroll.js';
import { initCustomCursor } from './cursor.js';
import { initScrollEngine } from './scroll.js';
import { initHeroCanvas } from './hero.js';
import { initAnimations } from './animations.js';
import { initProcess } from './process.js';
import { initCalculator } from './calculator.js';
import { initTrust } from './trust.js';
import { initInquiryEngine } from './cta.js';
import { initAllFormFeedback } from './form-feedback.js';
import { initNavigation } from './navigation.js';
import { getEdoersLogoSvg } from './logo.js';
import { initRouter } from './router.js';
import { renderHomePortfolio, initFullPortfolio, renderDetailView } from './portfolio-view.js';
import { renderServicesPage } from './services-page.js';
import { renderSolutionsPage } from './solutions-page.js';
import { renderAboutPage } from './about-page.js';
import { renderCareersPage } from './careers-page.js';
import { renderBlogPage } from './blog-page.js';
import { $ } from './utils.js';

/**
 * Global Single-Click Enforcement Guard
 * Swallows accidental double-clicks or hardware double-fires on CTAs, links, buttons, and menus.
 */
function initSingleClickGuard() {
  let lastClickTime = 0;
  let lastClickedElement = null;

  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, .btn, [data-view], input[type="submit"], .p-filter-pill, .filter-btn, .cta, .service-tab-btn');
    if (!target) return;

    const now = Date.now();
    const timeDiff = now - lastClickTime;

    // 1. Same element clicked within 450ms -> Swallow second click
    if (lastClickedElement === target && timeDiff < 450) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    // 2. Rapid tap across interactive elements within 250ms -> Swallow
    if (timeDiff < 250) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    lastClickTime = now;
    lastClickedElement = target;
  }, true);
}

document.addEventListener('DOMContentLoaded', () => {
  // 0. Enforce Global Single Click Debouncer
  initSingleClickGuard();

  // 1. Render Official Brand SVG Logo in Header, Footer, and Hero Devices
  const headerLogo = $('#header-logo-container');
  const footerLogo = $('#footer-logo-container');
  const heroDeviceLogo = $('#hero-device-logo');
  const tabletDeviceLogo = $('#tablet-device-logo');
  const phoneDeviceLogo = $('#phone-device-logo');

  if (headerLogo) headerLogo.innerHTML = getEdoersLogoSvg({ width: 160, showTagline: true });
  if (footerLogo) footerLogo.innerHTML = getEdoersLogoSvg({ width: 180, showTagline: true });
  if (heroDeviceLogo) heroDeviceLogo.innerHTML = getEdoersLogoSvg({ width: 140, showTagline: true });
  if (tabletDeviceLogo) tabletDeviceLogo.innerHTML = getEdoersLogoSvg({ width: 100, showTagline: false });
  if (phoneDeviceLogo) phoneDeviceLogo.innerHTML = getEdoersLogoSvg({ width: 80, showTagline: false });

  // 2. Render All Page Views
  renderHomePortfolio();
  initFullPortfolio();
  renderServicesPage();
  renderSolutionsPage();
  renderAboutPage();
  renderCareersPage();
  renderBlogPage();

  // 3. Initialize Theme Engine (Dark / Light)
  initThemeEngine();

  // 4. Custom Precision Cursor
  initCustomCursor();

  // 5. Scroll Engine & Lenis Locomotive Smooth Scrolling
  initLenisScroll();
  initScrollEngine();

  // 6. Hero Generative Canvas Mesh
  initHeroCanvas();

  // 7. GSAP Section Reveal Animations
  initAnimations();

  // 8. Router Initializer
  initRouter((viewName, projectId) => {
    if (viewName === 'portfolio-detail') {
      renderDetailView(projectId);
    }
  });

  // 7. Methodology & Process Switcher
  initProcess();

  // 8. Interactive ROI & Project Calculator
  initCalculator();

  // 9. Trust Metrics & Counters
  initTrust();

  // 10. Forms & Validation Feedback Engines
  initInquiryEngine();
  initAllFormFeedback();

  // 11. Navigation & Mobile Drawer
  initNavigation();
});
