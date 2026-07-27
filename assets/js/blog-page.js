/**
 * EDOERS Insights & Blog Engine
 */

import { $, $$ } from './utils.js';

const POSTS = [
  {
    id: 'post-1',
    title: 'Building Autonomous AI Agents with Gemini & Antigravity Frameworks',
    category: 'ai',
    categoryLabel: 'AI & ML',
    date: 'July 24, 2026',
    readTime: '8 min read',
    author: 'Ananya Patel',
    excerpt: 'How multi-modal LLMs with function calling enable self-healing workflows, automated document processing, and contextual real-time assistance.',
    content: `
      <p>Autonomous AI agents represent the next milestone in enterprise software engineering. Rather than static chatbots that merely answer questions, autonomous agents evaluate state, execute tools, query APIs, and self-correct errors.</p>
      
      <h3>Key Engineering Architectural Patterns</h3>
      <p>1. <strong>Strict Tool Typing:</strong> Using JSON schema or TypeScript interface declarations for function calling definitions to prevent hallucinated argument types.</p>
      <p>2. <strong>Vector RAG Pipelines:</strong> Indexing enterprise documentation into high-dimensional vector spaces (e.g. Pinecone) with hybrid keyword + semantic search for sub-100ms context retrieval.</p>
      <p>3. <strong>Stateful Conversation Loops:</strong> Maintaining author authority and session state safely in Redis or PostgreSQL, avoiding prompt memory overflow.</p>

      <blockquote style="border-left:3px solid var(--blue-primary); padding-left:1rem; margin:1.5rem 0; color:var(--text-secondary); font-style:italic;">
        "The shift from passive LLM text generation to active, tool-invoking AI agents is reducing operational enterprise workload by up to 60%."
      </blockquote>

      <p>At EDOERS, we integrate these agentic patterns directly into cloud microservices, granting organizations unprecedented productivity gains while preserving security and data privacy.</p>
    `
  },
  {
    id: 'post-2',
    title: 'Designing Microservice Architectures for 99.99% Uptime',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    date: 'July 18, 2026',
    readTime: '6 min read',
    author: 'Rohan Sharma',
    excerpt: 'Best practices for Kubernetes pod auto-scaling, distributed rate limiting, graceful degradation, and blue/green production deployment pipelines.',
    content: `
      <p>Achieving four nines (99.99%) availability requires architecting for failure at every tier of your application infrastructure.</p>

      <h3>1. Circuit Breakers and Bulkheads</h3>
      <p>When an upstream service experiences high latency, circuit breakers prevent cascading failures by tripping fast and returning fallback responses.</p>

      <h3>2. Blue/Green Deployment Strategy</h3>
      <p>Zero-downtime releases ensure that traffic seamlessly shifts from active (blue) to staging (green) environments only after comprehensive health checks pass.</p>
    `
  },
  {
    id: 'post-3',
    title: 'Modern UI/UX Design Systems for Accelerated SaaS Velocity',
    category: 'design',
    categoryLabel: 'UI/UX Design',
    date: 'July 10, 2026',
    readTime: '5 min read',
    author: 'Meera Iyer',
    excerpt: 'Why mathematical typographic scales, tokenized CSS variables, and Figma-to-code alignment speed up engineering iteration times by 3x.',
    content: `
      <p>A well-structured design system serves as the single source of truth between product designers and frontend developers.</p>

      <p>By enforcing strict spacing tokens (4px/8px grid), WCAG 2.2 AA contrast ratios, and accessible ARIA attributes, teams eliminate visual regressions and ship new features faster.</p>
    `
  },
  {
    id: 'post-4',
    title: 'Optimizing Cloud Costs on AWS & Kubernetes',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    date: 'June 28, 2026',
    readTime: '7 min read',
    author: 'Devendra Mehta',
    excerpt: 'Practical guide to spot instance scheduling, node auto-provisioning, and database query caching to slash cloud bills by 40%.',
    content: `
      <p>Cloud infrastructure costs can quickly spiral out of control without automated governance. Learn how spot instances and horizontal pod autoscalers reduce compute overhead without sacrificing uptime.</p>
    `
  },
  {
    id: 'post-5',
    title: 'Building HIPAA-Compliant Healthcare Platforms in 2026',
    category: 'enterprise',
    categoryLabel: 'Enterprise',
    date: 'June 15, 2026',
    readTime: '9 min read',
    author: 'Vikram Shah',
    excerpt: 'A comprehensive checklist for data encryption at rest and in transit, audited user access logs, and WebRTC telemetry in health portals.',
    content: `
      <p>Security and compliance are non-negotiable in digital healthcare. We cover AES-256 encryption, TLS 1.3 requirements, and role-based access control (RBAC) implementations.</p>
    `
  },
  {
    id: 'post-6',
    title: 'How RAG and Vector Databases Power Enterprise Knowledge Search',
    category: 'ai',
    categoryLabel: 'AI & ML',
    date: 'June 02, 2026',
    readTime: '8 min read',
    author: 'Priya Joshi',
    excerpt: 'Eliminate LLM hallucinations by coupling vector embedding search with custom document chunks for hyper-accurate enterprise search.',
    content: `
      <p>Retrieval-Augmented Generation (RAG) grounds language models in company data, ensuring zero hallucinations and verified citation sources.</p>
    `
  }
];

export function renderBlogPage() {
  const container = $('#view-blog');
  if (!container) return;

  const featured = POSTS[0];
  const regular = POSTS.slice(1);

  container.innerHTML = `
    <section class="section" style="padding-top: 8rem;">
      <div class="container">
        <!-- Header -->
        <div style="margin-bottom: 3rem;">
          <span class="text-eyebrow" style="color: var(--blue-primary); font-weight: 700;">INSIGHTS &amp; ENGINEERING</span>
          <h1 class="h1" style="margin-top: 0.5rem; margin-bottom: 1rem;">Perspectives on Software, AI &amp; Design</h1>
          <p class="text-lead" style="max-width: 720px;">
            In-depth technical articles, architectural guides, and design thoughts written directly by EDOERS software architects and lead designers.
          </p>
        </div>

        <!-- Featured Article Hero -->
        <div class="blog-featured-card">
          <div>
            <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
              <span class="detail-tag-badge">${featured.categoryLabel}</span>
              <span style="font-size:0.8125rem; color:var(--text-muted);">${featured.date} &bull; ${featured.readTime}</span>
            </div>
            <h2 style="font-size: clamp(1.5rem, 3vw, 2rem); font-weight:800; color:var(--text-primary); line-height:1.25; margin-bottom:1rem;">
              ${featured.title}
            </h2>
            <p style="font-size:1rem; color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">
              ${featured.excerpt}
            </p>
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <div style="width:32px; height:32px; border-radius:50%; background:var(--blue-primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:700;">AP</div>
                <span style="font-size:0.875rem; font-weight:600; color:var(--text-primary);">By ${featured.author}</span>
              </div>
              <button class="btn btn-blue read-post-btn" data-post-id="${featured.id}">
                Read Article &rarr;
              </button>
            </div>
          </div>

          <div style="background:linear-gradient(135deg, rgba(37,99,235,0.2), rgba(0,242,254,0.2)); border:1px solid var(--border-medium); border-radius:var(--radius-xl); height:240px; display:flex; align-items:center; justify-content:center; text-align:center; padding:1.5rem;">
            <div>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--blue-primary)" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--blue-primary); font-weight:700; margin-top:0.75rem;">[ AI AGENT ARCHITECTURE ]</div>
            </div>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div style="margin-bottom: 2rem;">
          <div class="services-tab-nav" id="blog-tabs">
            <button class="service-tab-btn active" data-cat="all">All Articles</button>
            <button class="service-tab-btn" data-cat="ai">AI &amp; ML</button>
            <button class="service-tab-btn" data-cat="cloud">Cloud &amp; DevOps</button>
            <button class="service-tab-btn" data-cat="design">UI/UX Design</button>
            <button class="service-tab-btn" data-cat="enterprise">Enterprise</button>
          </div>
        </div>

        <!-- Blog Grid -->
        <div class="blog-grid" id="blog-posts-grid">
          ${regular.map(p => createBlogCardHtml(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Article Reader Modal -->
    <div id="blog-modal-backdrop" class="app-modal-backdrop">
      <div class="app-modal-container" style="max-width:760px;">
        <button id="blog-modal-close" class="app-modal-close">&times;</button>
        
        <div style="margin-bottom:1.5rem;">
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;">
            <span class="detail-tag-badge" id="modal-post-cat">AI &amp; ML</span>
            <span style="font-size:0.8125rem; color:var(--text-muted);" id="modal-post-meta">July 24, 2026 &bull; 8 min read</span>
          </div>
          <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-primary); line-height:1.3;" id="modal-post-title">Article Title</h2>
          <div style="font-size:0.875rem; font-weight:600; color:var(--blue-primary); margin-top:0.5rem;" id="modal-post-author">By Ananya Patel</div>
        </div>

        <div id="modal-post-body" style="font-size:0.95rem; color:var(--text-secondary); line-height:1.7;">
          <!-- Article Body Injected Here -->
        </div>

        <div style="margin-top:2rem; padding-top:1.5rem; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
          <a href="#contact" data-view="contact" class="btn btn-blue" id="modal-blog-cta">Discuss Project Requirements &rarr;</a>
          <button class="btn btn-secondary" id="modal-blog-dismiss">Close Article</button>
        </div>
      </div>
    </div>
  `;

  // Attach Category Filter listeners
  const filterTabs = $('#blog-tabs');
  if (filterTabs) {
    const btns = $$('.service-tab-btn', filterTabs);
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        const cards = $$('.blog-card', container);

        cards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-cat') === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Attach Modal listeners
  const backdrop = $('#blog-modal-backdrop');
  const closeBtn = $('#blog-modal-close');
  const dismissBtn = $('#modal-blog-dismiss');

  function closeModal() {
    if (backdrop) backdrop.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  document.addEventListener('click', (e) => {
    const readBtn = e.target.closest('.read-post-btn');
    if (readBtn) {
      const postId = readBtn.getAttribute('data-post-id');
      const post = POSTS.find(p => p.id === postId);
      if (post && backdrop) {
        $('#modal-post-cat').textContent = post.categoryLabel;
        $('#modal-post-meta').textContent = `${post.date} • ${post.readTime}`;
        $('#modal-post-title').textContent = post.title;
        $('#modal-post-author').textContent = `By ${post.author}`;
        $('#modal-post-body').innerHTML = post.content;
        backdrop.classList.add('active');
      }
    }
  });
}

function createBlogCardHtml(p) {
  return `
    <div class="blog-card" data-cat="${p.category}">
      <div class="blog-card-thumb">
        <span class="detail-tag-badge" style="position:absolute; top:1rem; left:1rem;">${p.categoryLabel}</span>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--blue-primary)" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
      </div>
      <div class="blog-card-body">
        <div style="font-size:0.8125rem; color:var(--text-muted);">${p.date} &bull; ${p.readTime}</div>
        <h3 class="blog-title">${p.title}</h3>
        <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">${p.excerpt}</p>
        <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center; padding-top:1rem; border-top:1px solid var(--border-subtle);">
          <span style="font-size:0.8125rem; font-weight:600; color:var(--text-primary);">By ${p.author}</span>
          <button class="btn btn-secondary read-post-btn" data-post-id="${p.id}" style="font-size:0.75rem; padding:0.4rem 0.8rem;">Read Article &rarr;</button>
        </div>
      </div>
    </div>
  `;
}
