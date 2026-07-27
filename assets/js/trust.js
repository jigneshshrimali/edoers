/**
 * EDOERS Trust & Metrics Animation Engine
 */

import { $, $$, animateCounter } from './utils.js';

export function initTrust() {
  const statNumbers = $$('.animate-stat');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.target, 10);
          const prefix = stat.dataset.prefix || '';
          const suffix = stat.dataset.suffix || '';
          if (!isNaN(target)) {
            animateCounter(stat, target, 2200, prefix, suffix);
          }
        });
      }
    });
  }, { threshold: 0.3 });

  const trustSection = $('#trust');
  if (trustSection) observer.observe(trustSection);
}
