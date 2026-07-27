/**
 * EDOERS Precision Magnetic Studio Cursor
 */

export function initCustomCursor() {
  // Disable on touch devices for mobile ergonomics
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursorDot = document.createElement('div');
  const cursorRing = document.createElement('div');

  cursorDot.className = 'custom-cursor-dot';
  cursorRing.className = 'custom-cursor-ring';

  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);

  // Inject styles for custom cursor
  const style = document.createElement('style');
  style.textContent = `
    .custom-cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 6px; height: 6px;
      background-color: var(--cyan-accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, background-color 0.2s;
    }
    .custom-cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 32px; height: 32px;
      border: 1px solid var(--cyan-border);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s;
    }
    body.cursor-hover .custom-cursor-dot {
      width: 10px; height: 10px;
      background-color: var(--cyan-accent);
    }
    body.cursor-hover .custom-cursor-ring {
      width: 50px; height: 50px;
      background: var(--cyan-subtle);
      border-color: var(--cyan-accent);
    }
  `;
  document.head.appendChild(style);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states for interactive elements
  const interactives = 'a, button, input, select, textarea, .portfolio-card, .calc-chip, .filter-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}
