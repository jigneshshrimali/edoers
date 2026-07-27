/**
 * EDOERS Official Brand Vector Logo Component
 * Ribbon Cross Symbol + Geometric Lettering + "INTELLIGENCE. ENGINEERED." Tagline
 */

export function getEdoersLogoSvg(options = {}) {

//  const theme = document.documentElement.getAttribute('data-theme') || 'dark';

  const { width = 160, showTagline = true } = options;
  return `
    <div class="edoers-brand-logo" style="display: inline-flex; align-items: center; gap: 0.75rem; text-decoration: none; color: currentColor;">
     
    
     <img
        id="edoers-logo"
        src="/assets/logo_dark.png"
        style="height:75px;width:auto;"
        alt="EDOERS Logo">
            </div>
    `;
}
