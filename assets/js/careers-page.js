/**
 * EDOERS Careers Page & Job Application Engine
 */

import { $, $$ } from './utils.js';

const JOBS = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer (React / Node.js)',
    dept: 'engineering',
    deptLabel: 'Engineering',
    type: 'Full-Time',
    location: 'Ahmedabad / Hybrid / Remote',
    exp: '4+ Years',
    salary: '₹18,000,00 - ₹28,000,00 / yr',
    desc: 'Lead the architecture and implementation of scalable SaaS web applications, REST/GraphQL APIs, and microservices for global fintech clients.'
  },
  {
    id: 'job-2',
    title: 'AI Automation & Agent Specialist (Python / Gemini)',
    dept: 'ai',
    deptLabel: 'AI Research',
    type: 'Full-Time',
    location: 'Ahmedabad / Remote',
    exp: '3+ Years',
    salary: '₹20,000,00 - ₹32,000,00 / yr',
    desc: 'Build autonomous multi-modal AI agents, RAG vector search pipelines, and function calling workflows using modern LLMs.'
  },
  {
    id: 'job-3',
    title: 'Lead UI/UX Product Designer',
    dept: 'design',
    deptLabel: 'Design',
    type: 'Full-Time',
    location: 'Ahmedabad (Prahlad Nagar)',
    exp: '5+ Years',
    salary: '₹16,000,00 - ₹25,000,00 / yr',
    desc: 'Create tactile Figma design systems, responsive layout structures, interactive micro-animations, and client design presentations.'
  },
  {
    id: 'job-4',
    title: 'DevOps & Kubernetes Cloud Architect',
    dept: 'engineering',
    deptLabel: 'DevOps',
    type: 'Full-Time',
    location: 'Remote (India)',
    exp: '4+ Years',
    salary: '₹22,000,00 - ₹35,000,00 / yr',
    desc: 'Manage AWS/GCP Kubernetes clusters, Terraform infrastructure automation, CI/CD security audits, and zero-downtime blue/green releases.'
  }
];

export function renderCareersPage() {
  const container = $('#view-careers');
  if (!container) return;

  container.innerHTML = `
    <section class="section" style="padding-top: 8rem;">
      <div class="container">
        <!-- Header -->
        <div style="margin-bottom: 3rem;">
          <span class="text-eyebrow" style="color: var(--blue-primary); font-weight: 700;">CAREERS AT EDOERS</span>
          <h1 class="h1" style="margin-top: 0.5rem; margin-bottom: 1rem;">Build the Future With Us</h1>
          <p class="text-lead" style="max-width: 720px;">
            Join an elite engineering team where code craftsmanship, curiosity, and rapid growth are celebrated. We are hiring across Ahmedabad and remote locations.
          </p>
        </div>

        <!-- Perks & Benefits -->
        <div class="perks-grid">
          <div class="perk-card">
            <div style="font-size:1.5rem; margin-bottom:0.5rem;">💻</div>
            <h4 style="font-size:1rem; font-weight:700; color:var(--text-primary);">Top Tier Hardware</h4>
            <p style="font-size:0.8125rem; color:var(--text-muted); margin-top:0.25rem;">MacBook Pro M3 Max + 4K dual monitors provided to every engineer.</p>
          </div>

          <div class="perk-card">
            <div style="font-size:1.5rem; margin-bottom:0.5rem;">🌍</div>
            <h4 style="font-size:1rem; font-weight:700; color:var(--text-primary);">Flexible Remote Options</h4>
            <p style="font-size:0.8125rem; color:var(--text-muted); margin-top:0.25rem;">Work from our Ahmedabad tech center or remotely from anywhere in India.</p>
          </div>

          <div class="perk-card">
            <div style="font-size:1.5rem; font-weight:800;">📚</div>
            <h4 style="font-size:1rem; font-weight:700; color:var(--text-primary);">₹1,00,000 Learning Allowance</h4>
            <p style="font-size:0.8125rem; color:var(--text-muted); margin-top:0.25rem;">Annual budget for courses, technical books, and global tech conferences.</p>
          </div>

          <div class="perk-card">
            <div style="font-size:1.5rem; margin-bottom:0.5rem;">🏥</div>
            <h4 style="font-size:1rem; font-weight:700; color:var(--text-primary);">Comprehensive Health Cover</h4>
            <p style="font-size:0.8125rem; color:var(--text-muted); margin-top:0.25rem;">Comprehensive health insurance for you and your family up to ₹5 Lakhs.</p>
          </div>
        </div>

        <!-- Job Filters & Openings Header -->
        <div style="margin-top: 4rem; margin-bottom: 2rem;">
          <h2 class="h2" style="margin-bottom: 1rem;">Open Job Positions</h2>
          
          <div class="services-tab-nav" id="careers-tabs">
            <button class="service-tab-btn active" data-dept="all">All Departments</button>
            <button class="service-tab-btn" data-dept="engineering">Engineering</button>
            <button class="service-tab-btn" data-dept="ai">AI Research</button>
            <button class="service-tab-btn" data-dept="design">Design</button>
          </div>
        </div>

        <!-- Open Job Cards List -->
        <div style="display:flex; flex-direction:column; gap:1.25rem;" id="jobs-list-container">
          ${JOBS.map(job => createJobCardHtml(job)).join('')}
        </div>
      </div>
    </section>

    <!-- Job Application Modal -->
    <div id="job-modal-backdrop" class="app-modal-backdrop">
      <div class="app-modal-container">
        <button id="job-modal-close" class="app-modal-close">&times;</button>
        
        <div style="margin-bottom:1.5rem;">
          <span class="detail-tag-badge" id="modal-job-dept">ENGINEERING</span>
          <h3 style="font-size:1.35rem; font-weight:700; color:var(--text-primary); margin-top:0.4rem;" id="modal-job-title">Apply for Position</h3>
          <p style="font-size:0.875rem; color:var(--text-muted);" id="modal-job-loc">Ahmedabad / Hybrid</p>
        </div>

        <form id="job-application-form">
          <input type="hidden" name="jobTitle" id="form-job-title" value="" />
          <div style="display:grid; grid-template-columns:1fr; gap:1rem;">
            <div>
              <label class="form-label">Full Name *</label>
              <input type="text" name="applicantName" class="form-input" placeholder="e.g. Rahul Verma" required />
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">
              <div>
                <label class="form-label">Email Address *</label>
                <input type="email" name="applicantEmail" class="form-input" placeholder="e.g. rahul@example.com" required />
              </div>
              <div>
                <label class="form-label">Phone Number *</label>
                <input type="tel" name="applicantPhone" class="form-input" placeholder="e.g. +91 98765 43210" required />
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">
              <div>
                <label class="form-label">LinkedIn Profile URL *</label>
                <input type="url" name="linkedinUrl" class="form-input" placeholder="https://linkedin.com/in/..." required />
              </div>
              <div>
                <label class="form-label">GitHub / Portfolio Link</label>
                <input type="url" name="portfolioUrl" class="form-input" placeholder="https://github.com/..." />
              </div>
            </div>

            <div>
              <label class="form-label">Brief Cover Note / Experience Highlights</label>
              <textarea name="coverNote" class="form-textarea" placeholder="Tell us why you're a great fit for this role..." rows="3"></textarea>
            </div>

            <div id="job-form-feedback" class="form-feedback"></div>

            <button type="submit" class="btn btn-blue" style="width:100%; padding:0.875rem;">
              Submit Application &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Attach Department Filter listener
  const filterTabs = $('#careers-tabs');
  if (filterTabs) {
    const btns = $$('.service-tab-btn', filterTabs);
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const dept = btn.getAttribute('data-dept');
        const cards = $$('.job-card', container);

        cards.forEach(card => {
          if (dept === 'all' || card.getAttribute('data-dept') === dept) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Attach Modal listeners
  const backdrop = $('#job-modal-backdrop');
  const closeBtn = $('#job-modal-close');
  const appForm = $('#job-application-form');

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  }

  document.addEventListener('click', (e) => {
    const applyBtn = e.target.closest('.apply-job-btn');
    if (applyBtn) {
      const jobId = applyBtn.getAttribute('data-job-id');
      const job = JOBS.find(j => j.id === jobId);
      if (job && backdrop) {
        $('#modal-job-dept').textContent = job.deptLabel.toUpperCase();
        $('#modal-job-title').textContent = job.title;
        $('#modal-job-loc').textContent = `${job.location} | Exp: ${job.exp} | Salary: ${job.salary}`;
        $('#form-job-title').value = job.title;
        backdrop.classList.add('active');
      }
    }
  });

  if (appForm) {
    appForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = $('#job-form-feedback');
      const btn = appForm.querySelector('button[type="submit"]');
      if (btn) btn.innerHTML = 'Submitting...';

      setTimeout(() => {
        if (feedback) {
          feedback.className = 'form-feedback success';
          feedback.style.display = 'block';
          feedback.innerHTML = '✓ Application Submitted Successfully! Our talent team will review your profile and reach out within 48 hours.';
        }
        if (btn) btn.innerHTML = 'Application Sent ✓';
        appForm.reset();
        setTimeout(() => backdrop.classList.remove('active'), 2500);
      }, 1000);
    });
  }
}

function createJobCardHtml(j) {
  return `
    <div class="job-card" data-dept="${j.dept}">
      <div>
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
          <span class="job-meta-pill">${j.deptLabel}</span>
          <span class="job-meta-pill">${j.type}</span>
          <span class="job-meta-pill" style="color:var(--blue-primary); font-weight:700;">${j.location}</span>
        </div>
        <h3 style="font-size:1.25rem; font-weight:700; color:var(--text-primary);">${j.title}</h3>
        <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.4rem; max-width:640px;">${j.desc}</p>
        <div style="font-size:0.8125rem; font-weight:700; color:var(--text-secondary); margin-top:0.5rem;">
          Experience: ${j.exp} &nbsp;|&nbsp; Est. Compensation: <span style="color:#10B981;">${j.salary}</span>
        </div>
      </div>
      <button class="btn btn-blue apply-job-btn" data-job-id="${j.id}" style="align-self:flex-start; flex-shrink:0;">
        Apply Now &rarr;
      </button>
    </div>
  `;
}
