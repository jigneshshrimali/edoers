/**
 * EDOERS Theme Engine - Dark Obsidian & Light Ceramic Dual Theme Switcher
 * Persists user preference using state-manager Proxy with system preference fallback.
 */

import { state, subscribe, setTheme } from './state-manager.js';

export function initThemeEngine() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Apply initial theme from state
  applyTheme(state.theme || 'dark');

  // Subscribe to theme changes in state-manager
  subscribe('theme', (newTheme) => {
    applyTheme(newTheme);
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Listen for OS system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('edoers_theme_preference')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

// Switch logo
  const logo = document.getElementById('edoers-logo');
  if (logo) {
    logo.src =
      theme === 'dark'
        ? '/assets/logo_dark.png'
        : '/assets/logo_light.png';
  }

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`);
    toggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`);
  }
}

