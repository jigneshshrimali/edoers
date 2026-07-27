/**
 * EDOERS Smooth Scroll, Scrollspy, Header Behavior & GSAP Parallax Engine
 * - Observes sections using Intersection Observer to update active class on nav-links
 * - Integrates GSAP ScrollTrigger for subtle, premium parallax effects on visual elements
 * - Uses transform-only animations (y/yPercent) and respects prefers-reduced-motion
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$ } from './utils.js';

gsap.registerPlugin(ScrollTrigger);

let scrollObserver = null;
let activeParallaxTriggers = [];

// Helper to check user preference for reduced motion
function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initScrollEngine() {
  const header = $('#site-header');

  // 1. Header background on scroll
  function handleScroll() {
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Setup IntersectionObserver for active section highlight on scroll
  setupSectionObserver();

  // 3. Initialize GSAP ScrollTrigger Parallax Effects across active sections
  setupParallaxEffects();

  // Re-observe sections and refresh parallax whenever hash changes or page view updates
  window.addEventListener('hashchange', () => {
    setTimeout(() => {
      setupSectionObserver();
      setupParallaxEffects();
    }, 200);
  });
}

/**
 * Setup IntersectionObserver to watch visible sections and update nav-link active state
 */
export function setupSectionObserver() {
  const navLinks = $$('.nav-link');
  const activeView = $('.page-view.active') || $('#main-content');
  if (!activeView) return;

  const sections = $$('section[id], .section[id], div[id^="view-"] section', activeView);
  if (sections.length === 0) return;

  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  const visibleSections = new Map();

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSections.set(entry.target, entry.intersectionRatio);
      } else {
        visibleSections.delete(entry.target);
      }
    });

    if (visibleSections.size === 0) return;

    // Find section with highest intersection ratio
    let bestSection = null;
    let maxRatio = -1;

    visibleSections.forEach((ratio, target) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        bestSection = target;
      }
    });

    if (bestSection) {
      const sectionId = bestSection.getAttribute('id');
      const viewName = bestSection.closest('.page-view')?.id?.replace('view-', '');

      navLinks.forEach(link => {
        const linkHref = link.getAttribute('href')?.replace('#', '');
        const linkDataView = link.getAttribute('data-view');

        const isMatch = (sectionId && linkHref === sectionId) ||
                        (viewName && (linkDataView === viewName || linkHref === viewName));

        if (isMatch) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }
  }, {
    root: null,
    rootMargin: '-15% 0px -40% 0px',
    threshold: [0.1, 0.3, 0.6, 0.9]
  });

  sections.forEach(sec => scrollObserver.observe(sec));
}

/**
 * Setup subtle, premium GSAP ScrollTrigger parallax on visual elements
 * Strictly uses transform properties (y / yPercent) and respects prefers-reduced-motion
 */
export function setupParallaxEffects(container = null) {
  // Clean up existing triggers before re-initializing
  activeParallaxTriggers.forEach(st => st.kill());
  activeParallaxTriggers = [];

  // Respect prefers-reduced-motion setting
  if (isReducedMotion()) return;

  const scope = container || $('.page-view.active') || document.body;

  // 1. Hero background & glow canvas subtle depth shift
  const heroSection = scope.querySelector('.hero, #hero, .detail-hero');
  const heroGlows = scope.querySelectorAll('#hero-canvas, .hero-generative-canvas, .hero-bg-glow, .hero-glow-orb');

  if (heroSection && heroGlows.length > 0) {
    heroGlows.forEach((glow) => {
      const st = ScrollTrigger.create({
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(glow, { yPercent: self.progress * 18, force3D: true });
        }
      });
      activeParallaxTriggers.push(st);
    });
  }

  // 2. Section Visual Elements, Cards Accent & Mesh Parallax
  const parallaxTargets = scope.querySelectorAll(
    '[data-parallax], .detail-hero-banner, .trust-bg-mesh, .portfolio-detail-img, .section-visual-accent, .card-icon-glow, .glow-effect'
  );

  parallaxTargets.forEach((el) => {
    const speed = parseFloat(el.dataset.parallaxSpeed || '0.15');
    const direction = el.dataset.parallaxDir === 'up' ? -1 : 1;
    const parentSection = el.closest('section, .section, .detail-hero') || el;

    const st = ScrollTrigger.create({
      trigger: parentSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        // Calculate smooth transform displacement strictly using y
        const yOffset = (self.progress - 0.5) * 80 * speed * direction;
        gsap.set(el, { y: yOffset, force3D: true });
      }
    });

    activeParallaxTriggers.push(st);
  });

  // Refresh ScrollTrigger calculations
  ScrollTrigger.refresh();
}


