/**
 * EDOERS Navigation & Mobile Menu Overlay Engine
 * Includes Single-Execution Lock System for Menu & CTA Interaction Safety
 */

import { $, $$ } from './utils.js';

let isNavigating = false;
let navLockTimer = null;

/**
 * Acquire single-execution navigation lock. Returns true if acquired, false if locked.
 * Automatically releases lock after timeoutMs safety threshold or via releaseNavigationLock().
 */
export function acquireNavigationLock(timeoutMs = 500) {
  if (isNavigating) {
    return false;
  }
  isNavigating = true;
  if (navLockTimer) clearTimeout(navLockTimer);
  navLockTimer = setTimeout(() => {
    isNavigating = false;
  }, timeoutMs);
  return true;
}

export function releaseNavigationLock() {
  isNavigating = false;
  if (navLockTimer) {
    clearTimeout(navLockTimer);
    navLockTimer = null;
  }
}

export function isNavigationLocked() {
  return isNavigating;
}

export function initNavigation() {
  const toggleBtn = $('#mobile-toggle');
  const navMenu = $('#nav-menu');
  const navLinks = $$('.nav-link', navMenu);

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      if (!acquireNavigationLock(350)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const isOpen = navMenu.classList.toggle('is-open');
      toggleBtn.classList.toggle('is-active', isOpen);
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        toggleBtn.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}

