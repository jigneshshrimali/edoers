/**
 * EDOERS Services Page Interactive Renderer
 */

import { $, $$ } from './utils.js';

export function renderServicesPage() {
  const container = $('#view-services');
  if (!container) return;

  container.innerHTML = `
    <section class="section" style="padding-top: 8rem;">
      <div class="container">
        <!-- Breadcrumb / Header -->
        <div style="margin-bottom: 2.5rem;">
          <span class="text-eyebrow" style="color: var(--blue-primary); font-weight: 700;">OUR CAPABILITIES</span>
          <h1 class="h1" style="margin-top: 0.5rem; margin-bottom: 1rem;">End-to-End Technology &amp; Engineering</h1>
          <p class="text-lead" style="max-width: 720px;">
            We partner with visionary founders and enterprises to engineer custom digital platforms, autonomous AI workflows, high-throughput cloud backends, and intuitive user experiences.
          </p>
        </div>

        <!-- Capability Tabs Filter -->
        <div class="services-tab-nav" id="services-tabs">
          <button class="service-tab-btn active" data-tab="all">All Services</button>
          <button class="service-tab-btn" data-tab="ai">AI Agents &amp; ML</button>
          <button class="service-tab-btn" data-tab="saas">SaaS Platforms</button>
          <button class="service-tab-btn" data-tab="enterprise">Enterprise Apps</button>
          <button class="service-tab-btn" data-tab="cloud">Cloud &amp; DevOps</button>
          <button class="service-tab-btn" data-tab="data">Data &amp; BI</button>
          <button class="service-tab-btn" data-tab="design">UI/UX Strategy</button>
        </div>

        <!-- Services Grid -->
        <div class="services-grid" id="services-page-grid">
          <!-- Card 1: AI Agents -->
          <div class="service-detail-card" data-cat="ai">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div class="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
              <span class="service-number">01</span>
            </div>
            <div>
              <h3 class="service-title">AI Agents &amp; Autonomous Workflows</h3>
              <p style="font-size:0.9375rem; color:var(--text-muted); line-height:1.6; margin-top:0.5rem;">
                Harness Gemini, Anthropic, and custom LLM models to create autonomous agents, RAG document search engines, voice synthesis tools, and intelligent customer automation.
              </p>
            </div>
            <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
              <div style="font-size:0.8125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Core Deliverables:</div>
              <div class="check-list-grid" style="font-size:0.8125rem;">
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> RAG &amp; Vector Databases</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Custom Fine-tuned LLMs</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Autonomous Function Calling</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Real-Time Audio / Speech AI</div>
              </div>
            </div>
            <div class="service-deliverables">
              <span class="deliverable-tag">Gemini API</span>
              <span class="deliverable-tag">LangChain</span>
              <span class="deliverable-tag">Python</span>
              <span class="deliverable-tag">Pinecone</span>
            </div>
            <a href="#contact" data-view="contact" class="btn btn-outline" style="align-self:flex-start;">Inquire About AI Solutions &rarr;</a>
          </div>

          <!-- Card 2: SaaS Platforms -->
          <div class="service-detail-card" data-cat="saas">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div class="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <span class="service-number">02</span>
            </div>
            <div>
              <h3 class="service-title">SaaS Product Engineering</h3>
              <p style="font-size:0.9375rem; color:var(--text-muted); line-height:1.6; margin-top:0.5rem;">
                Full lifecycle SaaS platform development from multi-tenant architecture and subscription billing engines to role-based access control and high-concurrency microservices.
              </p>
            </div>
            <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
              <div style="font-size:0.8125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Core Deliverables:</div>
              <div class="check-list-grid" style="font-size:0.8125rem;">
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Multi-Tenant Data Isolation</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Stripe &amp; Razorpay Checkout</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Team Member Invitations</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Usage Analytics Dashboards</div>
              </div>
            </div>
            <div class="service-deliverables">
              <span class="deliverable-tag">React / Next.js</span>
              <span class="deliverable-tag">Node.js</span>
              <span class="deliverable-tag">PostgreSQL</span>
              <span class="deliverable-tag">Stripe</span>
            </div>
            <a href="#contact" data-view="contact" class="btn btn-outline" style="align-self:flex-start;">Build Your SaaS Platform &rarr;</a>
          </div>

          <!-- Card 3: Enterprise Software -->
          <div class="service-detail-card" data-cat="enterprise">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div class="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <span class="service-number">03</span>
            </div>
            <div>
              <h3 class="service-title">Enterprise Software &amp; Modernization</h3>
              <p style="font-size:0.9375rem; color:var(--text-muted); line-height:1.6; margin-top:0.5rem;">
                Transform monolithic legacy codebases into cloud-native microservice frameworks. We build secure, audited ERPs, CRMs, and supply chain management hubs.
              </p>
            </div>
            <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
              <div style="font-size:0.8125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Core Deliverables:</div>
              <div class="check-list-grid" style="font-size:0.8125rem;">
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Monolith-to-Microservices</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> SOC2 &amp; ISO Compliance</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> OAuth &amp; SAML Single Sign-On</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Automated Database Migration</div>
              </div>
            </div>
            <div class="service-deliverables">
              <span class="deliverable-tag">TypeScript</span>
              <span class="deliverable-tag">Docker</span>
              <span class="deliverable-tag">GraphQL</span>
              <span class="deliverable-tag">Redis</span>
            </div>
            <a href="#contact" data-view="contact" class="btn btn-outline" style="align-self:flex-start;">Discuss Enterprise Needs &rarr;</a>
          </div>

          <!-- Card 4: Cloud & DevOps -->
          <div class="service-detail-card" data-cat="cloud">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div class="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
              </div>
              <span class="service-number">04</span>
            </div>
            <div>
              <h3 class="service-title">Cloud Infrastructure &amp; DevOps</h3>
              <p style="font-size:0.9375rem; color:var(--text-muted); line-height:1.6; margin-top:0.5rem;">
                Zero-downtime CI/CD automation, Kubernetes orchestrations, automated failovers, and Terraform Infrastructure as Code (IaC) on AWS, Google Cloud, and Azure.
              </p>
            </div>
            <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
              <div style="font-size:0.8125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Core Deliverables:</div>
              <div class="check-list-grid" style="font-size:0.8125rem;">
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Kubernetes Cluster Setup</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Terraform &amp; Infrastructure as Code</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Automated CI/CD Pipelines</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> 24/7 Monitoring &amp; Alerting</div>
              </div>
            </div>
            <div class="service-deliverables">
              <span class="deliverable-tag">AWS</span>
              <span class="deliverable-tag">GCP</span>
              <span class="deliverable-tag">Kubernetes</span>
              <span class="deliverable-tag">Terraform</span>
            </div>
            <a href="#contact" data-view="contact" class="btn btn-outline" style="align-self:flex-start;">Optimize Cloud Infra &rarr;</a>
          </div>

          <!-- Card 5: Data & BI -->
          <div class="service-detail-card" data-cat="data">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div class="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <span class="service-number">05</span>
            </div>
            <div>
              <h3 class="service-title">Data Engineering &amp; Analytics</h3>
              <p style="font-size:0.9375rem; color:var(--text-muted); line-height:1.6; margin-top:0.5rem;">
                Transform fragmented company data into real-time streaming dashboards, predictive forecasting models, and high-performance analytical data warehouses.
              </p>
            </div>
            <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
              <div style="font-size:0.8125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Core Deliverables:</div>
              <div class="check-list-grid" style="font-size:0.8125rem;">
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> ETL / ELT Data Pipelines</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Snowflake / ClickHouse Warehousing</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Interactive WebGL Charts</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Anomaly Detection Engines</div>
              </div>
            </div>
            <div class="service-deliverables">
              <span class="deliverable-tag">Snowflake</span>
              <span class="deliverable-tag">D3.js</span>
              <span class="deliverable-tag">ClickHouse</span>
              <span class="deliverable-tag">Python</span>
            </div>
            <a href="#contact" data-view="contact" class="btn btn-outline" style="align-self:flex-start;">Build Analytics Cockpit &rarr;</a>
          </div>

          <!-- Card 6: UI/UX Strategy -->
          <div class="service-detail-card" data-cat="design">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div class="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <span class="service-number">06</span>
            </div>
            <div>
              <h3 class="service-title">UI/UX Design &amp; Product Strategy</h3>
              <p style="font-size:0.9375rem; color:var(--text-muted); line-height:1.6; margin-top:0.5rem;">
                User-centered product design, interactive wireframes, custom Figma design systems, micro-interactions, and WCAG 2.2 AA accessibility audits.
              </p>
            </div>
            <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
              <div style="font-size:0.8125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Core Deliverables:</div>
              <div class="check-list-grid" style="font-size:0.8125rem;">
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> User Research &amp; Wireframing</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Comprehensive Figma Design Systems</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Interactive Prototypes</div>
                <div class="check-item"><span class="check-icon-blue">&#10003;</span> Accessibility Compliance Audits</div>
              </div>
            </div>
            <div class="service-deliverables">
              <span class="deliverable-tag">Figma</span>
              <span class="deliverable-tag">Design Systems</span>
              <span class="deliverable-tag">Micro-Interactions</span>
              <span class="deliverable-tag">WCAG 2.2</span>
            </div>
            <a href="#contact" data-view="contact" class="btn btn-outline" style="align-self:flex-start;">Redesign Your Product &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  `;

  // Filter tabs logic
  const tabNav = $('#services-tabs');
  if (tabNav) {
    const btns = $$('.service-tab-btn', tabNav);
    const cards = $$('.service-detail-card', container);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');

        cards.forEach(card => {
          if (tab === 'all' || card.getAttribute('data-cat') === tab) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}
