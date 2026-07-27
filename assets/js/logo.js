/**
 * EDOERS Official Brand Vector Logo Component
 * Ribbon Cross Symbol + Geometric Lettering + "INTELLIGENCE. ENGINEERED." Tagline
 */
import logoDark from '../logo_dark.png';
import logoLight from '../logo.png';

export function getEdoersLogoSvg(options = {}) {

//  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
     const theme = document.documentElement.getAttribute('data-theme') || 'dark';

  const { width = 160, showTagline = true } = options;
  return `
    <div class="edoers-brand-logo" style="display: inline-flex; align-items: center; gap: 0.75rem; text-decoration: none; color: currentColor;">
     

<img
    class="edoers-logo"
    src="${theme === 'dark' ? logoDark : logoLight}"
    alt="EDOERS Technologies">
                </div>
    `;
}
