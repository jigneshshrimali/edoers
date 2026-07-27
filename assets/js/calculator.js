/**
 * EDOERS Interactive ROI & Scope Estimator Engine
 */

import { $, $$, formatCurrency } from './utils.js';

export function initCalculator() {
  const revenueSlider = $('#calc-revenue-slider');
  const revenueDisplay = $('#calc-revenue-display');
  const chipOptions = $$('.calc-chip');
  
  const estInvestment = $('#calc-est-investment');
  const estRoiMultiplier = $('#calc-est-roi');
  const estTimeline = $('#calc-est-timeline');
  const ctaConvertBtn = $('#calc-convert-btn');

  if (!revenueSlider) return;

  function calculateEstimate() {
    const targetRevenue = parseInt(revenueSlider.value, 10) || 500000;
    revenueDisplay.textContent = formatCurrency(targetRevenue);

    // Selected scope complexity
    const selectedScopes = $$('.calc-chip.selected');
    let scopeWeight = 1.0;
    selectedScopes.forEach(chip => {
      scopeWeight += parseFloat(chip.dataset.weight || 0.2);
    });

    // Base investment formula
    const baseInvestment = Math.max(35000, Math.round(targetRevenue * 0.08 * scopeWeight / 5000) * 5000);
    const projectedRevenueGain = targetRevenue * (0.35 * scopeWeight);
    const roiMultiplier = ((projectedRevenueGain / baseInvestment) + 1).toFixed(1);
    const timelineWeeks = Math.max(4, Math.round(6 * scopeWeight));

    estInvestment.textContent = formatCurrency(baseInvestment);
    estRoiMultiplier.textContent = `${roiMultiplier}x ROI`;
    estTimeline.textContent = `${timelineWeeks} Weeks`;
  }

  revenueSlider.addEventListener('input', calculateEstimate);

  chipOptions.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      calculateEstimate();
    });
  });

  if (ctaConvertBtn) {
    ctaConvertBtn.addEventListener('click', () => {
      const budgetSelect = $('#inquiry-budget');
      const briefInput = $('#inquiry-brief');
      const contactSection = $('#contact');

      if (budgetSelect && briefInput) {
        briefInput.value = `[Calculated via ROI Engine]\nTarget Revenue Impact: ${revenueDisplay.textContent}\nEstimated Investment Tier: ${estInvestment.textContent}\nExpected Timeline: ${estTimeline.textContent}`;
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  calculateEstimate();
}
