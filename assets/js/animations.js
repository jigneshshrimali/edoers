/**
 * EDOERS GSAP Animation & Transition Engine
 * Uses GSAP Flip and Timeline to manage seamless, high-end page transitions
 * between view IDs inside the '#main-content' container with a polished cross-fade motion signature.
 * Also handles ScrollTrigger section content reveals and subtle parallax effects.
 * Respects user preferences for reduced motion (WCAG 2.2).
 */

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollTo as lenisScrollTo, refreshLenis } from './lenis-scroll.js';
import { $ } from './utils.js';

gsap.registerPlugin(Flip, ScrollTrigger);

let isTransitioning = false;

/**
 * Check prefers-reduced-motion media query
 * @returns {boolean}
 */
function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Perform a seamless, high-end GSAP Flip + Timeline cross-fade view transition
 * between view elements inside #main-content
 * @param {HTMLElement} currentView - Currently active view element
 * @param {HTMLElement} targetView - Target view element to transition to
 * @param {Function} [onComplete] - Callback function after transition completes
 */
export function transitionView(currentView, targetView, onComplete) {
  if (isTransitioning) return;

  const mainContainer = $('#main-content');
  if (!mainContainer) return;

  const reducedMotion = isReducedMotion();

  // Handle same view or missing initial view edge case
  if (!currentView || currentView === targetView) {
    if (targetView) {
      targetView.style.display = 'block';
      targetView.classList.add('active');
      if (reducedMotion) {
        gsap.set(targetView, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(targetView,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' }
        );
      }
      initScrollTriggerAnimations(targetView);
    }
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  isTransitioning = true;

  // Kill running tweens and ScrollTriggers on active views
  gsap.killTweensOf([currentView, targetView]);

  if (reducedMotion) {
    // Instant switch without motion for reduced-motion users
    currentView.classList.remove('active');
    currentView.style.display = 'none';
    gsap.set(currentView, { clearProps: 'all' });

    targetView.style.display = 'block';
    targetView.classList.add('active');
    gsap.set(targetView, { opacity: 1, y: 0 });

    lenisScrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
    refreshLenis();

    isTransitioning = false;
    initScrollTriggerAnimations(targetView);
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  // 1. Capture Flip State for shared data-flip-id elements across views
  const flipTargets = document.querySelectorAll('[data-flip-id]');
  let flipState = null;
  if (flipTargets.length > 0) {
    flipState = Flip.getState(flipTargets, { props: 'borderRadius,boxShadow,transform' });
  }

  // 2. Master View Transition Timeline with Cross-Fade Signature
  const transitionTl = gsap.timeline({
    defaults: { ease: 'power3.inOut' },
    onComplete: () => {
      isTransitioning = false;
      if (typeof onComplete === 'function') onComplete();
    }
  });

  // Outgoing View Fade Out & Micro-Lift
  transitionTl.to(currentView, {
    opacity: 0,
    y: -14,
    scale: 0.985,
    duration: 0.22,
    ease: 'power2.inOut',
    onComplete: () => {
      currentView.classList.remove('active');
      currentView.style.display = 'none';
      gsap.set(currentView, { clearProps: 'all' });

      // Prepare Incoming Target View
      targetView.style.display = 'block';
      targetView.classList.add('active');

      // Reset scroll position to top
      lenisScrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
      refreshLenis();
    }
  });

  // Animate GSAP Flip for shared elements if present
  if (flipState) {
    transitionTl.add(() => {
      Flip.from(flipState, {
        duration: 0.45,
        ease: 'power3.inOut',
        scale: true,
        absolute: true,
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      });
    }, '<');
  }

  // Incoming View Cross-fade Entrance
  transitionTl.fromTo(targetView,
    { opacity: 0, y: 20, scale: 0.99 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power3.out',
      clearProps: 'transform'
    },
    '>-0.05'
  );

  // Initialize ScrollTrigger reveal animations for incoming sections
  transitionTl.add(() => {
    initScrollTriggerAnimations(targetView);
  }, '<0.1');
}

/**
 * Initialize GSAP ScrollTrigger staggered reveal animations for sections within a container
 * @param {HTMLElement} container - View container element
 */
export function initScrollTriggerAnimations(container) {
  if (!container) return;

  const reducedMotion = isReducedMotion();

  // Refresh ScrollTrigger calculations after DOM layout settles
  ScrollTrigger.refresh();

  // Find all section elements within the target container
  const sections = container.querySelectorAll('.section, section, .detail-hero, .blog-featured-card');

  sections.forEach((sec) => {
    // Skip if already initialized
    if (sec.dataset.scrollTriggerInit === 'true') return;

    if (reducedMotion) {
      gsap.set(sec, { opacity: 1, y: 0 });
      sec.dataset.scrollTriggerInit = 'true';
      return;
    }

    const headers = sec.querySelectorAll('.text-eyebrow, h1, .h1, h2, .h2, .hero-headline, .text-lead, .detail-title');
    const cards = sec.querySelectorAll('.service-detail-card, .solution-card, .project-card-item, .team-card, .blog-card, .job-card, .perk-card, .glass-card, .feature-card, .process-card, .trust-metric-card, .calculator-card');
    const ctas = sec.querySelectorAll('.btn, .service-tab-btn');

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });

    if (headers.length > 0) {
      timeline.fromTo(Array.from(headers),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'transform' },
        0
      );
    }

    if (cards.length > 0) {
      timeline.fromTo(Array.from(cards),
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', clearProps: 'transform' },
        '<=0.1'
      );
    }

    if (ctas.length > 0) {
      timeline.fromTo(Array.from(ctas),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', clearProps: 'transform' },
        '<=0.15'
      );
    }

    sec.dataset.scrollTriggerInit = 'true';
  });

  // Initialize subtle parallax effects for hero and visual elements
  initParallaxEffects(container);
}

/**
 * Initialize subtle GSAP ScrollTrigger parallax effects on hero canvas and visual background elements
 * @param {HTMLElement} container - Active view container
 */
export function initParallaxEffects(container) {
  if (!container || isReducedMotion()) return;

  // 1. Hero canvas / background depth parallax
  const heroCanvas = container.querySelector('#hero-canvas, .hero-generative-canvas, .hero-bg-glow');
  const heroSection = container.querySelector('.hero, #hero, .detail-hero');

  if (heroCanvas && heroSection) {
    gsap.to(heroCanvas, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 2. Section visual elements & background mesh parallax
  const parallaxTargets = container.querySelectorAll('[data-parallax], .detail-hero-banner, .trust-bg-mesh, .hero-glow-orb, .portfolio-detail-img');

  parallaxTargets.forEach((el) => {
    const speed = parseFloat(el.dataset.parallaxSpeed || '0.15');
    const direction = el.dataset.parallaxDir === 'up' ? -1 : 1;

    gsap.to(el, {
      y: () => direction * (60 * speed),
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('.section, section, .detail-hero') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6
      }
    });
  });
}

/**
 * Initialize animation engine and ScrollTrigger defaults
 */
export function initAnimations() {
  const activeView = document.querySelector('.page-view.active');
  if (activeView) {
    initScrollTriggerAnimations(activeView);
  }

  // Handle window resize to recalculate triggers
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}
