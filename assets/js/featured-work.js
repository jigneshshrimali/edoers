/**
 * EDOERS Featured Work & Case Study Drawer Engine
 */

import { $, $$ } from './utils.js';

export const portfolioData = [
  {
    id: 'aura-wealth',
    title: 'Aura Financial AI Platform',
    category: 'ai-systems',
    client: 'Aura Capital Global',
    metric: '+$420M AUM',
    impact: '+310% Qualified Conversion',
    description: 'Autonomous financial intelligence platform engineered for private wealth clients with real-time portfolio simulation engines.',
    imageBg: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
    badgeText: 'AI System / Fintech',
    techStack: ['TypeScript', 'WebGL Shader Engine', 'Gemini AI API', 'Node.js', 'PostgreSQL'],
    challenge: 'Aura Capital needed to replace an outdated legacy client portal with an ultra-high trust, ultra-fast platform that could visually synthesize complex wealth projections in real time.',
    solution: 'EDOERS designed a bespoke dark-mode interface featuring a zero-latency WebGL graph engine, automated AI scenario analysis, and enterprise-grade OAuth security.',
    results: ['+$420M increase in Assets Under Management within 90 days', '310% surge in high-net-worth client onboarding conversions', '99.99% uptime with <40ms global API latency']
  },
  {
    id: 'lumina-spatial',
    title: 'Lumina Spatial Commerce',
    category: 'motion-webgl',
    client: 'Lumina Couture Paris',
    metric: '1.2M Visits',
    impact: '+185% Avg Session Duration',
    description: '3D spatial retail platform bringing haute-couture fashion collections into high-fidelity web environments.',
    imageBg: 'linear-gradient(135deg, #1A1C23 0%, #0F1015 100%)',
    badgeText: 'Spatial Commerce / WebGL',
    techStack: ['Three.js', 'GLSL Shaders', 'WebGPU', 'Headless Shopify API'],
    challenge: 'Translating the tactile luxury and exclusivity of physical haute-couture runways into a web experience without page load friction.',
    solution: 'Engineered a progressive WebGL pipeline streaming compressed 3D garments with dynamic photorealistic lighting and instant checkout capabilities.',
    results: ['+185% increase in online user session engagement', '42% decrease in product return rates via 3D sizing visualization', 'Awwwards Site of the Month Winner']
  },
  {
    id: 'kinetic-labs',
    title: 'Kinetic Quantum Platform',
    category: 'product-architecture',
    client: 'Kinetic Systems Inc.',
    metric: '99.98% Latency Drop',
    impact: '+440% Qualified Enterprise Inquiries',
    description: 'High-frequency cloud infrastructure dashboard designed for quantum computing research and commercial deployments.',
    imageBg: 'linear-gradient(135deg, #0A0E17 0%, #121A29 100%)',
    badgeText: 'Product Architecture / DeepTech',
    techStack: ['React', 'D3.js', 'Rust WebAssembly', 'Tailwind CSS'],
    challenge: 'Visualizing multi-terabyte quantum state simulations for enterprise researchers without freezing browser rendering threads.',
    solution: 'Created a multi-threaded Rust WebAssembly rendering pipeline paired with an ultra-clean architectural control UI.',
    results: ['Rendered 100,000 live data points at a locked 60 FPS', '+440% growth in tier-1 enterprise partnership inquiries', 'Adopted by 14 Fortune 500 tech labs globally']
  },
  {
    id: 'chronos-logistics',
    title: 'Chronos Global OS',
    category: 'enterprise-platforms',
    client: 'Chronos Supply Chain',
    metric: '14.8M Shipments',
    impact: '-62% Logistics Command Latency',
    description: 'Next-generation supply chain command center unifying predictive route optimization and real-time fleet telemetry.',
    imageBg: 'linear-gradient(135deg, #11131A 0%, #181C26 100%)',
    badgeText: 'Enterprise OS / Logistics',
    techStack: ['TypeScript', 'Mapbox GL', 'Express.js', 'Google Cloud Platform'],
    challenge: 'Logistics directors were overwhelmed by fragmented legacy monitors causing delayed decision-making during global port disruptions.',
    solution: 'Built a unified single-pane-of-glass operating system with AI disruption forecasting and automated rerouting protocols.',
    results: ['-62% reduction in operational decision latency', 'Saved $18.4M in annual port congestion surcharges', 'Engineered for zero-fail redundancy across 4 continents']
  }
];

export function initFeaturedWork() {
  const filterBtns = $$('.filter-btn');
  const modalBackdrop = $('#modal-backdrop');
  const modalContainer = $('#modal-container');
  const modalClose = $('#modal-close');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = $$('.portfolio-card');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Case Study Open Trigger
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.portfolio-card');
    if (card) {
      const id = card.dataset.id;
      const item = portfolioData.find(p => p.id === id);
      if (item && modalBackdrop && modalContainer) {
        openModal(item);
      }
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  function openModal(data) {
    const modalContent = $('#modal-body');
    if (!modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-header">
        <span class="portfolio-client">${data.client}</span>
        <h2 class="h2" style="margin-top: 0.5rem; margin-bottom: 1rem;">${data.title}</h2>
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
          <span class="status-pill">${data.badgeText}</span>
          <span class="status-pill" style="border-color: var(--cyan-accent);">${data.metric}</span>
        </div>
      </div>
      <div style="padding: 1.5rem; background: var(--bg-tertiary); border-radius: var(--radius-lg); margin-bottom: 2rem; border: 1px solid var(--border-subtle);">
        <p class="text-lead" style="margin: 0; font-weight: 500; color: var(--text-primary);">${data.description}</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <div>
          <h4 style="color: var(--cyan-accent); font-family: var(--font-mono); font-size: 0.875rem; text-transform: uppercase; margin-bottom: 0.5rem;">01. The Challenge</h4>
          <p>${data.challenge}</p>
        </div>
        <div>
          <h4 style="color: var(--cyan-accent); font-family: var(--font-mono); font-size: 0.875rem; text-transform: uppercase; margin-bottom: 0.5rem;">02. The Architecture & Solution</h4>
          <p>${data.solution}</p>
        </div>
      </div>
      <div style="margin-bottom: 2rem;">
        <h4 style="color: var(--cyan-accent); font-family: var(--font-mono); font-size: 0.875rem; text-transform: uppercase; margin-bottom: 0.75rem;">03. Business Impact</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.results.map(res => `<li style="display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--cyan-accent);">✓</span> <span>${res}</span></li>`).join('')}
        </ul>
      </div>
      <div>
        <h4 style="color: var(--cyan-accent); font-family: var(--font-mono); font-size: 0.875rem; text-transform: uppercase; margin-bottom: 0.75rem;">Technology Stack</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.techStack.map(tech => `<span class="deliverable-tag">${tech}</span>`).join('')}
        </div>
      </div>
      <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
        <a href="#contact" onclick="document.getElementById('modal-backdrop').classList.remove('is-active')" class="btn btn-primary">Initiate Similar Project →</a>
      </div>
    `;

    modalBackdrop?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop?.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}
