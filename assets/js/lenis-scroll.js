/**
 * EDOERS Lenis Smooth Scroll Engine
 * Implements smooth, premium locomotive scrolling across the entire site,
 * ensuring tactile, calibrated motion perfectly synchronized with GSAP ScrollTrigger.
 * Respects user preferences for reduced motion.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

/**
 * Helper to check user preference for reduced motion
 * @returns {boolean}
 */
function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Inject standalone CSS rules required for Lenis locomotive smooth scrolling
 */
function injectLenisStyles() {
  if (document.getElementById('edoers-lenis-styles')) return;

  const style = document.createElement('style');
  style.id = 'edoers-lenis-styles';
  style.textContent = `
    html.lenis, html.lenis body {
      height: auto;
    }

    .lenis.lenis-smooth {
      scroll-behavior: auto !important;
    }

    .lenis.lenis-smooth [data-lenis-prevent] {
      overscroll-behavior: contain;
    }

    .lenis.lenis-stopped {
      overflow: hidden;
    }

    .lenis.lenis-smooth iframe {
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize Lenis Smooth Scrolling and link directly with GSAP ScrollTrigger
 * @param {object} [customOptions] - Optional Lenis configuration overrides
 * @returns {Lenis|null}
 */
export function initLenisScroll(customOptions = {}) {
  // Inject Lenis CSS styles
  injectLenisStyles();

  // If user prefers reduced motion, fallback to native browser scrolling
  if (isReducedMotion()) {
    console.info('[EDOERS] Lenis smooth scrolling disabled: prefers-reduced-motion enabled.');
    return null;
  }

  // Destroy existing instance if re-initializing
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  // Calibrated Lenis configuration for smooth, tactile locomotive feel
  const options = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smooth decay curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
    autoResize: true,
    ...customOptions
  };

  lenisInstance = new Lenis(options);

  // Synchronize ScrollTrigger updates with Lenis scroll events
  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Synchronize Lenis RAF loop with GSAP's Ticker for lockstep 60/120fps animation synchronization
  gsap.ticker.add((time) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
    }
  });

  // Disable GSAP lag smoothing to prevent visual stutter during heavy scroll RAF updates
  gsap.ticker.lagSmoothing(0);

  // Bind internal anchor links for Lenis smooth navigation
  setupAnchorInterception();

  return lenisInstance;
}

/**
 * Get the current Lenis instance
 * @returns {Lenis|null}
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Smoothly scroll to a target (element, selector string, or numeric scroll position)
 * @param {string|HTMLElement|number} target - Scroll target
 * @param {object} [options] - Lenis scrollTo options
 */
export function scrollTo(target, options = {}) {
  if (isReducedMotion() || !lenisInstance) {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  const defaultOptions = {
    offset: -80, // Header height offset
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    ...options
  };

  lenisInstance.scrollTo(target, defaultOptions);
}

/**
 * Temporarily stop Lenis scroll (useful during modals, drawers, or preloader transitions)
 */
export function stopLenis() {
  if (lenisInstance) {
    lenisInstance.stop();
  }
}

/**
 * Resume Lenis smooth scroll
 */
export function startLenis() {
  if (lenisInstance) {
    lenisInstance.start();
  }
}

/**
 * Recalculate Lenis scroll dimensions and refresh GSAP ScrollTrigger
 */
export function refreshLenis() {
  if (lenisInstance) {
    lenisInstance.resize();
  }
  ScrollTrigger.refresh();
}

/**
 * Intercept internal `#` anchor link clicks for Lenis smooth scrolling
 */
function setupAnchorInterception() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#view-')) return;

    const targetEl = document.querySelector(href);
    if (targetEl) {
      e.preventDefault();
      scrollTo(targetEl, { offset: -90 });
    }
  });
}
