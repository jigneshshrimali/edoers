/**
 * EDOERS Process / Methodology Stage Switcher
 */

import { $$ } from './utils.js';

export function initProcess() {
  const processSteps = $$('.process-step');

  processSteps.forEach(step => {
    step.addEventListener('click', () => {
      processSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });
}
