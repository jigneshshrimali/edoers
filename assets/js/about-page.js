/**
 * EDOERS About Us Page Renderer
 */

import { $ } from './utils.js';

export function renderAboutPage() {
  const container = $('#view-about');
  if (!container) return;

  container.innerHTML = `
    <section class="section" style="padding-top: 8rem;">
      <div class="container">
        <!-- Hero Section -->
        <div class="about-hero-grid">
          <div>
            <span class="text-eyebrow" style="color: var(--blue-primary); font-weight: 700;">ABOUT EDOERS</span>
            <h1 class="h1" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">Intelligence. Engineered.</h1>
            <p class="text-lead" style="margin-bottom: 1.5rem;">
              Headquartered in Ahmedabad, India, EDOERS is an elite technology agency and software engineering firm specializing in high-concurrency web applications, AI automation agents, SaaS platforms, and enterprise digital transformations.
            </p>
            <p style="font-size:1rem; color:var(--text-secondary); line-height:1.7;">
              We bridge the gap between creative visual craftsmanship and complex software architecture. Every solution we engineer is built for speed, accessibility, security, and measurable ROI.
            </p>
          </div>

          <!-- Highlight Box -->
          <div style="background:var(--bg-card); border:1px solid var(--border-medium); border-radius:var(--radius-2xl); padding:2rem; position:relative; overflow:hidden;">
            <div style="font-size:3rem; font-weight:900; color:var(--blue-primary); line-height:1;">150+</div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-top:0.5rem;">Projects Delivered Globally</div>
            <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.75rem; line-height:1.5;">
              Across North America, Europe, Asia, and Australia with a 98% client retention rate.
            </p>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1.5rem; padding-top:1.5rem; border-top:1px solid var(--border-subtle);">
              <div>
                <div style="font-size:1.5rem; font-weight:800; color:var(--text-primary);">50+</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">Enterprise Clients</div>
              </div>
              <div>
                <div style="font-size:1.5rem; font-weight:800; color:var(--text-primary);">99.9%</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">Uptime SLA Guarantee</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Four Core Values -->
        <div style="margin-top: 5rem;">
          <span class="text-eyebrow" style="color: var(--blue-primary); font-weight: 700;">OUR PHILOSOPHY</span>
          <h2 class="h2" style="margin-top: 0.5rem; margin-bottom: 2rem;">Built On Uncompromising Principles</h2>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.5rem;">
            <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.75rem;">
              <div style="width:40px; height:40px; border-radius:8px; background:rgba(37,99,235,0.1); color:var(--blue-primary); display:flex; align-items:center; justify-content:center; margin-bottom:1rem; font-weight:800;">01</div>
              <h3 style="font-size:1.125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Speed &amp; Performance First</h3>
              <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">We write clean, lightweight code that loads sub-second and scales smoothly under heavy traffic.</p>
            </div>

            <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.75rem;">
              <div style="width:40px; height:40px; border-radius:8px; background:rgba(37,99,235,0.1); color:var(--blue-primary); display:flex; align-items:center; justify-content:center; margin-bottom:1rem; font-weight:800;">02</div>
              <h3 style="font-size:1.125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Transparent Partnership</h3>
              <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">No hidden fees or scope ambiguity. You get weekly sprint demos and direct access to senior devs.</p>
            </div>

            <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.75rem;">
              <div style="width:40px; height:40px; border-radius:8px; background:rgba(37,99,235,0.1); color:var(--blue-primary); display:flex; align-items:center; justify-content:center; margin-bottom:1rem; font-weight:800;">03</div>
              <h3 style="font-size:1.125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Pragmatic Innovation</h3>
              <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">We leverage AI and modern cloud tools to solve genuine business problems, not for novelty.</p>
            </div>

            <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.75rem;">
              <div style="width:40px; height:40px; border-radius:8px; background:rgba(37,99,235,0.1); color:var(--blue-primary); display:flex; align-items:center; justify-content:center; margin-bottom:1rem; font-weight:800;">04</div>
              <h3 style="font-size:1.125rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">End-to-End Ownership</h3>
              <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.5;">From initial concept whiteboard to production deployment and SLA support, we own the full stack.</p>
            </div>
          </div>
        </div>

        <!-- Leadership & Team Grid -->
        <div style="margin-top: 5rem;">
          <span class="text-eyebrow" style="color: var(--blue-primary); font-weight: 700;">LEADERSHIP</span>
          <h2 class="h2" style="margin-top: 0.5rem; margin-bottom: 2rem;">Meet Our Leadership Team</h2>

          <div class="team-grid">
            <!-- Member 1 -->
            <div class="team-card">
              <div class="team-avatar-box">VS</div>
              <h3 class="team-name">Vikram Shah</h3>
              <div class="team-role">Co-Founder &amp; CEO</div>
              <p class="team-bio">Ex-Google software leader with 14+ years experience building global distributed cloud platforms.</p>
              <a href="https://linkedin.com" target="_blank" class="btn btn-secondary" style="font-size:0.75rem; padding:0.4rem 0.8rem;">LinkedIn Profile &#8599;</a>
            </div>

            <!-- Member 2 -->
            <div class="team-card">
              <div class="team-avatar-box">AP</div>
              <h3 class="team-name">Ananya Patel</h3>
              <div class="team-role">Co-Founder &amp; CTO</div>
              <p class="team-bio">Distributed systems expert specializing in microservice architectures and high-throughput databases.</p>
              <a href="https://linkedin.com" target="_blank" class="btn btn-secondary" style="font-size:0.75rem; padding:0.4rem 0.8rem;">LinkedIn Profile &#8599;</a>
            </div>

            <!-- Member 3 -->
            <div class="team-card">
              <div class="team-avatar-box">RS</div>
              <h3 class="team-name">Rohan Sharma</h3>
              <div class="team-role">VP of Engineering</div>
              <p class="team-bio">Passionate full-stack architect leading front-end performance optimizations and DevOps pipelines.</p>
              <a href="https://linkedin.com" target="_blank" class="btn btn-secondary" style="font-size:0.75rem; padding:0.4rem 0.8rem;">LinkedIn Profile &#8599;</a>
            </div>

            <!-- Member 4 -->
            <div class="team-card">
              <div class="team-avatar-box">MI</div>
              <h3 class="team-name">Meera Iyer</h3>
              <div class="team-role">Head of UI/UX Design</div>
              <p class="team-bio">Award-winning product designer creating tactile design systems and accessible user interfaces.</p>
              <a href="https://linkedin.com" target="_blank" class="btn btn-secondary" style="font-size:0.75rem; padding:0.4rem 0.8rem;">LinkedIn Profile &#8599;</a>
            </div>
          </div>
        </div>

        <!-- Milestones Timeline -->
        <div style="margin-top: 5rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-2xl); padding: clamp(2rem, 3.5vw, 3rem);">
          <span class="text-eyebrow" style="color: var(--blue-primary); font-weight: 700;">OUR JOURNEY</span>
          <h2 class="h2" style="margin-top: 0.5rem; margin-bottom: 2rem;">Key Company Milestones</h2>

          <div class="timeline-container">
            <div class="timeline-item">
              <span class="timeline-year">2018</span>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-top:0.25rem;">Company Founded in Ahmedabad</h3>
              <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.25rem;">Started as a 4-person engineering boutique servicing early-stage SaaS startups.</p>
            </div>

            <div class="timeline-item">
              <span class="timeline-year">2020</span>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-top:0.25rem;">Global Client Expansion</h3>
              <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.25rem;">Crossed 50+ completed enterprise projects and expanded client base across US, UK, and UAE.</p>
            </div>

            <div class="timeline-item">
              <span class="timeline-year">2022</span>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-top:0.25rem;">Dedicated AI &amp; Cloud Lab</h3>
              <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.25rem;">Pioneered autonomous AI agent development and LLM fine-tuning practice for enterprise customers.</p>
            </div>

            <div class="timeline-item">
              <span class="timeline-year">2024 - Present</span>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-top:0.25rem;">150+ Enterprise Milestones</h3>
              <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.25rem;">45+ full-time engineers based out of Skyline Tower, Prahlad Nagar, Ahmedabad.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
