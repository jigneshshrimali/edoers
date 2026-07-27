/**
 * EDOERS SPA View Router with GSAP Seamless Page Transitions
 * Handles hash-based switching between Home, Portfolio, Detail, Services, Solutions, About, Contact, etc.
 * Enforces single-execution lock & robust URL hash alias mapping.
 */

import { transitionView } from './animations.js';
import { updateSEO } from './seo-manager.js';
import { setCurrentView } from './state-manager.js';
import { acquireNavigationLock, releaseNavigationLock } from './navigation.js';
import { $, $$ } from './utils.js';

/**
 * Normalizes URL hash to standard view keys (supports #HOME, #ABOUTUS, #CONTACTUS, #PORTFOLIO, etc.)
 */
function normalizeViewName(rawHash) {
  if (!rawHash) return 'home';
  let clean = rawHash.replace('#', '').trim().toLowerCase();
  
  if (clean.startsWith('/')) clean = clean.substring(1);
  if (clean.endsWith('/')) clean = clean.slice(0, -1);
  
  if (clean.includes('?')) {
    clean = clean.split('?')[0];
  }

  // Handle common URL variations & capitalization aliases
  if (clean === 'home' || clean === 'index' || clean === '') return 'home';
  if (clean === 'about' || clean === 'aboutus' || clean === 'about-us') return 'about';
  if (clean === 'contact' || clean === 'contactus' || clean === 'contact-us' || clean === 'contatus') return 'contact';
  if (clean === 'portfolio' || clean === 'work') return 'portfolio';
  if (clean === 'services' || clean === 'service') return 'services';
  if (clean === 'solutions' || clean === 'solution') return 'solutions';
  
  return clean;
}

export function initRouter(onViewChange) {
  const views = $$('.page-view');
  const navLinks = $$('.nav-link');
  let currentHash = null;
  let activeProjectId = null;
  let isTransitioning = false;

  function updateView() {
    let rawHash = window.location.hash.replace('#', '') || 'home';
    let projectId = null;

    if (rawHash.toLowerCase().startsWith('portfolio-detail')) {
      const parts = rawHash.split('?id=');
      rawHash = 'portfolio-detail';
      projectId = parts[1] || 'nexora-banking';
    }

    let hash = normalizeViewName(rawHash);
    if (rawHash.toLowerCase().startsWith('portfolio-detail')) {
      hash = 'portfolio-detail';
    }

    // Guard 1: If already on this exact view and project ID, ignore re-entry
    if (currentHash === hash && activeProjectId === projectId) {
      releaseNavigationLock();
      return;
    }

    // Guard 2: If a view transition is currently animating, ignore rapid click re-triggers
    if (isTransitioning) {
      return;
    }

    let targetView = $(`#view-${hash}`);
    if (!targetView) {
      hash = 'home';
      targetView = $('#view-home');
    }

    // Find currently active visible view
    const currentView = views.find(v => v.classList.contains('active') && getComputedStyle(v).display !== 'none');

    // Update active nav link
    navLinks.forEach(link => {
      const viewName = normalizeViewName(link.getAttribute('data-view'));
      if (viewName === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (typeof onViewChange === 'function') {
      onViewChange(hash, projectId);
    }

    // Update global state manager
    setCurrentView(hash, projectId);

    // Dynamic SEO, Meta Tags, Canonical URL & JSON-LD Structured Data Update
    updateSEO(hash, projectId);

    // Mark current hash and transition state
    isTransitioning = true;
    currentHash = hash;
    activeProjectId = projectId;

    // GSAP Cross-fade transition system
    transitionView(currentView, targetView, () => {
      isTransitioning = false;
      releaseNavigationLock();
    });
  }

  window.addEventListener('hashchange', updateView);
  
  // Intercept click on data-view links to enforce single-execution lock
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-view]');
    if (link) {
      const rawViewAttr = link.getAttribute('data-view');
      const viewName = normalizeViewName(rawViewAttr);
      const projId = link.getAttribute('data-project-id');
      if (viewName) {
        let targetHash = viewName;
        if (projId) {
          targetHash = `portfolio-detail?id=${projId}`;
        }

        const rawCurrent = normalizeViewName(window.location.hash.replace('#', '')) || 'home';
        
        // Single Execution Lock Enforcement
        if (!acquireNavigationLock(500)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        // Prevent double click or duplicate load if already on target or in transition
        if (rawCurrent === targetHash || isTransitioning) {
          releaseNavigationLock();
          e.preventDefault();
          return;
        }

        e.preventDefault();
        window.location.hash = targetHash;
      }
    }
  });

  // Initial call
  updateView();
}



