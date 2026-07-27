/**
 * EDOERS Solutions Page Renderer
 */

import { $ } from './utils.js';

export function renderSolutionsPage() {
  const container = $('#view-solutions');
  if (!container) return;

  container.innerHTML = `
    <section class="section" style="padding-top: 8rem;">
      <div class="container">
        <!-- Header -->
        <div style="margin-bottom: 3rem;">
          <span class="text-eyebrow" style="color: var(--blue-primary); font-weight: 700;">ENTERPRISE SOLUTIONS</span>
          <h1 class="h1" style="margin-top: 0.5rem; margin-bottom: 1rem;">Industry Vertical Solutions</h1>
          <p class="text-lead" style="max-width: 720px;">
            We engineer tailored, compliance-ready software architectures for Fintech, Healthcare, EdTech, Supply Chain, and E-Commerce.
          </p>
        </div>

        <!-- Solutions Grid -->
        <div class="solutions-grid">
          <!-- Fintech -->
          <div class="solution-card">
            <div class="solution-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div>
              <span class="detail-tag-badge">FINANCIAL TECHNOLOGY</span>
              <h3 style="font-size:1.35rem; font-weight:700; color:var(--text-primary); margin-top:0.4rem;">Fintech &amp; Neo-Banking Platforms</h3>
              <p style="font-size:0.9rem; color:var(--text-muted); margin-top:0.5rem; line-height:1.5;">
                PCI-DSS compliant payment gateways, core banking engines, real-time ledger balance clearing, and biometric identity verification.
              </p>
            </div>
            <div class="solution-mockup-thumb">
              <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--cyan-accent); font-weight:700;">[ FINTECH ENGINE GRAPHIC ]</div>
            </div>
            <div class="check-list-grid" style="font-size:0.8125rem;">
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Sub-millisecond Ledger Processing</div>
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Automated Anti-Money Laundering (AML)</div>
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Open Banking API Gateway</div>
            </div>
          </div>

          <!-- Healthcare -->
          <div class="solution-card">
            <div class="solution-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <div>
              <span class="detail-tag-badge">HEALTHCARE &amp; MEDTECH</span>
              <h3 style="font-size:1.35rem; font-weight:700; color:var(--text-primary); margin-top:0.4rem;">Healthcare Portals &amp; Telemedicine</h3>
              <p style="font-size:0.9rem; color:var(--text-muted); margin-top:0.5rem; line-height:1.5;">
                HIPAA &amp; GDPR compliant Electronic Health Record (EHR) suites, AI diagnostic triage, and encrypted telehealth video consultations.
              </p>
            </div>
            <div class="solution-mockup-thumb">
              <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--cyan-accent); font-weight:700;">[ CLINICAL DASHBOARD MOCKUP ]</div>
            </div>
            <div class="check-list-grid" style="font-size:0.8125rem;">
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Encrypted Patient Records Storage</div>
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> WebRTC Video Consultation Engine</div>
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Automated Lab Results Notification</div>
            </div>
          </div>

          <!-- Logistics -->
          <div class="solution-card">
            <div class="solution-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <div>
              <span class="detail-tag-badge">SUPPLY CHAIN</span>
              <h3 style="font-size:1.35rem; font-weight:700; color:var(--text-primary); margin-top:0.4rem;">Supply Chain &amp; Fleet Logistics</h3>
              <p style="font-size:0.9rem; color:var(--text-muted); margin-top:0.5rem; line-height:1.5;">
                Real-time GPS vehicle tracking, automated route optimization algorithms, inventory forecasting, and digital Bill of Lading generation.
              </p>
            </div>
            <div class="solution-mockup-thumb">
              <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--cyan-accent); font-weight:700;">[ FLEET TELEMATICS MAP ]</div>
            </div>
            <div class="check-list-grid" style="font-size:0.8125rem;">
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Dynamic Route Re-routing</div>
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Cold Chain Temperature Alerts</div>
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Automated Warehouse Scanning</div>
            </div>
          </div>

          <!-- EdTech -->
          <div class="solution-card">
            <div class="solution-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </div>
            <div>
              <span class="detail-tag-badge">EDTECH &amp; LMS</span>
              <h3 style="font-size:1.35rem; font-weight:700; color:var(--text-primary); margin-top:0.4rem;">Virtual Campus &amp; LMS Systems</h3>
              <p style="font-size:0.9rem; color:var(--text-muted); margin-top:0.5rem; line-height:1.5;">
                Scalable virtual learning portals with gamified student progress tracking, live video lecture classrooms, and automated grading rubrics.
              </p>
            </div>
            <div class="solution-mockup-thumb">
              <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--cyan-accent); font-weight:700;">[ VIRTUAL CAMPUS PORTAL ]</div>
            </div>
            <div class="check-list-grid" style="font-size:0.8125rem;">
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Interactive Quiz Engine</div>
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> Digital Certificate Issuance</div>
              <div class="check-item"><span class="check-icon-blue">&#10003;</span> AI Tutor Assistant</div>
            </div>
          </div>
        </div>

        <!-- Architecture Matrix Comparison -->
        <div style="margin-top: 5rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-2xl); padding: clamp(2rem, 3.5vw, 3rem);">
          <span class="text-eyebrow" style="color: var(--blue-primary); font-weight: 700;">WHY EDOERS</span>
          <h2 class="h2" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">Standard Off-the-Shelf vs. EDOERS Engineered</h2>
          
          <div style="overflow-x: auto;">
            <table class="matrix-table">
              <thead>
                <tr>
                  <th>Architecture Feature</th>
                  <th>Generic / Off-the-Shelf Software</th>
                  <th>EDOERS Engineered Architecture</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Scalability Limit</strong></td>
                  <td>Bottlenecks at ~10k concurrent users</td>
                  <td><strong>Auto-scales to 1M+ requests / min on Kubernetes</strong></td>
                </tr>
                <tr>
                  <td><strong>Security &amp; Compliance</strong></td>
                  <td>Basic SSL, shared multi-tenant tables</td>
                  <td><strong>HIPAA, SOC2, PCI-DSS with isolated tenant schemas</strong></td>
                </tr>
                <tr>
                  <td><strong>Page Load Performance</strong></td>
                  <td>2.5s - 4.2s initial load</td>
                  <td><strong>Sub-500ms global edge cache delivery</strong></td>
                </tr>
                <tr>
                  <td><strong>AI Agent Integration</strong></td>
                  <td>Limited superficial chat widgets</td>
                  <td><strong>Autonomous tool execution &amp; fine-tuned models</strong></td>
                </tr>
                <tr>
                  <td><strong>Source Code Ownership</strong></td>
                  <td>Vendor lock-in with license fees</td>
                  <td><strong>100% Client Code Ownership &amp; IP Rights</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
}
