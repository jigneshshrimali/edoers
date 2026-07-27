/**
 * EDOERS Portfolio & Detail View Renderer (Matching Images 1, 2, 4, 5)
 */

import { $, $$ } from './utils.js';
import { ALL_PROJECTS } from './portfolio-data.js';

export function renderHomePortfolio() {
  const container = $('#home-portfolio-grid');
  if (!container) return;

  const featured = ALL_PROJECTS.slice(0, 4);
  container.innerHTML = featured.map(p => createProjectCardHtml(p)).join('');
}

export function initFullPortfolio() {
  const container = $('#portfolio-full-grid');
  const filterNav = $('#portfolio-category-nav');
  if (!container) return;

  let activeCategory = 'all';

  function renderList() {
    const filtered = activeCategory === 'all'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter(p => p.category === activeCategory);

    container.innerHTML = filtered.map(p => createProjectCardHtml(p)).join('');
  }

  if (filterNav) {
    const pills = $$('.p-filter-pill', filterNav);
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-category');
        renderList();
      });
    });
  }

  renderList();
}

function createProjectCardHtml(p) {
  return `
    <div class="project-card-item" data-view="portfolio-detail" data-project-id="${p.id}">
      <div class="project-card-thumb">
        <div class="project-category-tag">${p.categoryLabel}</div>
        <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(0, 242, 254, 0.15));">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--blue-primary)" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        </div>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.description}</p>
        <span class="project-card-link">View Project &rarr;</span>
      </div>
    </div>
  `;
}

export function renderDetailView(projectId) {
  const container = $('#detail-view-container');
  if (!container) return;

  const project = ALL_PROJECTS.find(p => p.id === projectId) || ALL_PROJECTS[0];

  container.innerHTML = `
    <!-- Breadcrumbs -->
    <div class="breadcrumb-nav">
      <a href="#portfolio" data-view="portfolio">Portfolio</a>
      <span>&gt;</span>
      <span style="color: var(--text-primary); font-weight: 600;">${project.title}</span>
    </div>

    <!-- Category Tag Badge -->
    <span class="detail-tag-badge">${project.categoryLabel}</span>

    <!-- Title & Subtitle -->
    <h1 class="detail-title">${project.title}</h1>
    <p class="detail-subtitle">${project.description}</p>

    <!-- Tag Pills -->
    <div class="detail-categories-list">
      ${project.tags.map(t => `<span class="detail-category-pill">${t}</span>`).join('')}
    </div>

    <!-- Actions Row -->
    <div class="detail-actions-row">
      <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-blue">Visit Live Site &#8599;</a>
      <a href="#contact" data-view="contact" class="btn btn-secondary">Request Case Study Brief &rarr;</a>
    </div>

    <!-- 4 Metrics Bar (Image 4) -->
    <div class="detail-metrics-bar">
      ${project.metrics.map(m => `
        <div class="detail-metric-item">
          <div class="metric-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
          <div>
            <div class="detail-metric-value">${m.value}</div>
            <div class="detail-metric-desc">${m.label}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Interactive Live UI Screen Mockup Container (Image 4) -->
    <div class="showcase-screens-container">
      <!-- Desktop Interactive Dashboard -->
      <div class="banking-dashboard-mockup">
        <div class="mockup-top-nav">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-weight:800; color:var(--blue-primary); letter-spacing:0.1em;">NEXORA</span>
            <span style="font-size:0.75rem; color:var(--text-muted);">BANKING PLATFORM</span>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <span style="padding:0.25rem 0.6rem; background:rgba(37,99,235,0.2); color:var(--cyan-accent); border-radius:4px; font-size:0.75rem;">LIVE APP DEMO</span>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
          <div style="background:var(--bg-card); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
            <span style="font-size:0.75rem; color:var(--text-muted);">Total Account Balance</span>
            <div style="font-size:1.5rem; font-weight:800; color:var(--text-primary); margin-top:0.25rem;">$124,580.42</div>
            <span style="font-size:0.75rem; color:#10B981;">+12.4% this month</span>
          </div>
          <div style="background:var(--bg-card); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
            <span style="font-size:0.75rem; color:var(--text-muted);">Monthly Spending</span>
            <div style="font-size:1.5rem; font-weight:800; color:var(--text-primary); margin-top:0.25rem;">$8,240.10</div>
            <span style="font-size:0.75rem; color:var(--text-muted);">Budget cap: $10,000</span>
          </div>
        </div>

        <!-- Quick Transactions Table -->
        <div style="background:var(--bg-card); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
          <div style="font-size:0.875rem; font-weight:700; margin-bottom:0.75rem; color:var(--text-primary);">Recent Transactions</div>
          <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.8125rem;">
            <div style="display:flex; justify-content:space-between; padding-bottom:0.4rem; border-bottom:1px solid var(--border-subtle);">
              <span>AWS Cloud Hosting</span>
              <span style="color:#EF4444;">-$1,240.00</span>
            </div>
            <div style="display:flex; justify-content:space-between; padding-bottom:0.4rem; border-bottom:1px solid var(--border-subtle);">
              <span>Client Wire Transfer</span>
              <span style="color:#10B981;">+$24,500.00</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Stripe Payment Revenue</span>
              <span style="color:#10B981;">+$8,120.00</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile App Mockup -->
      <div class="banking-mobile-mockup">
        <div style="text-align:center; padding-bottom:0.75rem; border-bottom:1px solid rgba(255,255,255,0.1); margin-bottom:1rem;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--blue-primary);">NEXORA MOBILE</span>
        </div>
        <div style="background:var(--bg-card); padding:0.75rem; border-radius:12px; margin-bottom:0.75rem;">
          <span style="font-size:0.7rem; color:var(--text-muted);">Alex Morgan</span>
          <div style="font-size:1.1rem; font-weight:800; color:var(--text-primary);">$42,100.00</div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:0.5rem;">
          <button style="padding:0.5rem; background:var(--blue-primary); color:#fff; border:none; border-radius:6px; font-size:0.75rem; font-weight:600;">Transfer</button>
          <button style="padding:0.5rem; background:var(--bg-card); color:var(--text-primary); border:1px solid var(--border-subtle); border-radius:6px; font-size:0.75rem; font-weight:600;">Pay Bills</button>
        </div>
      </div>
    </div>

    <!-- Detail Content Grid (Overview & Meta) -->
    <div class="detail-content-grid">
      <!-- Main Content Block -->
      <div class="detail-main-info">
        <div>
          <h3 class="info-block-title">Project Overview</h3>
          <p style="font-size:1rem; color:var(--text-secondary); line-height:1.7;">
            ${project.overview}
          </p>
        </div>

        <div>
          <h3 class="info-block-title">Our Role &amp; Responsibilities</h3>
          <div class="check-list-grid check-list-grid-2col">
            ${project.roles.map(r => `
              <div class="check-item">
                <span class="check-icon-blue">&#10003;</span>
                <span>${r}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h3 class="info-block-title">Key Features &amp; Capabilities</h3>
          <div class="check-list-grid">
            ${project.features.map(f => `
              <div class="check-item">
                <span class="check-icon-blue">&#10003;</span>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h3 class="info-block-title">Technology Stack</h3>
          <div class="tech-pills-row">
            ${project.techStack.map(t => `
              <div class="tech-badge-item">
                <span>${t.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right Meta Card -->
      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        <div class="project-meta-card">
          <h3 style="font-size:1.125rem; font-weight:700; color:var(--text-primary); border-bottom:1px solid var(--border-subtle); padding-bottom:0.75rem; margin-bottom:1rem;">Project Information</h3>
          
          <div class="meta-row-item">
            <div class="meta-details">
              <div class="meta-label">Client</div>
              <div class="meta-value">${project.client}</div>
            </div>
          </div>

          <div class="meta-row-item">
            <div class="meta-details">
              <div class="meta-label">Industry</div>
              <div class="meta-value">${project.industry}</div>
            </div>
          </div>

          <div class="meta-row-item">
            <div class="meta-details">
              <div class="meta-label">Timeline</div>
              <div class="meta-value">${project.timeline}</div>
            </div>
          </div>

          <div class="meta-row-item">
            <div class="meta-details">
              <div class="meta-label">Team Size</div>
              <div class="meta-value">${project.teamSize}</div>
            </div>
          </div>

          <div class="meta-row-item">
            <div class="meta-details">
              <div class="meta-label">Services</div>
              <div class="meta-value">${project.services}</div>
            </div>
          </div>

          <div class="meta-row-item">
            <div class="meta-details">
              <div class="meta-label">Live Site</div>
              <div class="meta-value"><a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">${project.liveUrl.replace('https://www.', '')} &#8599;</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
