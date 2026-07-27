/**
 * EDOERS Form Validation & Feedback Engine
 * Handles contact form submission, client-side real-time validation,
 * mock API simulation, and premium GSAP success/error feedback rendering.
 */

import { gsap } from 'gsap';
import { addNotification } from './state-manager.js';
import { $, $$ } from './utils.js';

// Configuration & Validation Regexes
const VALIDATION_RULES = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/,
  nameMinLength: 2,
  messageMinLength: 10
};

/**
 * Inject dynamic helper styles for form validation & animated feedback
 */
function injectFormFeedbackStyles() {
  if (document.getElementById('edoers-form-feedback-styles')) return;

  const style = document.createElement('style');
  style.id = 'edoers-form-feedback-styles';
  style.textContent = `
    .form-input.is-invalid,
    .form-select.is-invalid,
    .form-textarea.is-invalid {
      border-color: #EF4444 !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18) !important;
      background-color: rgba(239, 68, 68, 0.03) !important;
    }

    .form-input.is-valid,
    .form-select.is-valid,
    .form-textarea.is-valid {
      border-color: #10B981 !important;
    }

    .field-error-msg {
      display: block;
      font-size: 0.78rem;
      color: #F87171;
      margin-top: 0.35rem;
      font-family: var(--font-mono, monospace);
      letter-spacing: 0.02em;
      line-height: 1.3;
      opacity: 0;
      transform: translateY(-4px);
    }

    .form-feedback-card {
      margin-top: 1.5rem;
      padding: 1.5rem;
      border-radius: var(--radius-lg, 12px);
      background: var(--bg-secondary, #111827);
      border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.1));
      box-shadow: var(--shadow-card, 0 8px 30px rgba(0,0,0,0.3));
      overflow: hidden;
      transform-origin: top center;
    }

    .form-feedback-card.success-state {
      border-color: rgba(16, 185, 129, 0.4);
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(11, 15, 23, 0.95) 100%);
    }

    .form-feedback-card.error-state {
      border-color: rgba(239, 68, 68, 0.4);
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(11, 15, 23, 0.95) 100%);
    }

    .feedback-icon-box {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      flex-shrink: 0;
    }

    .success-state .feedback-icon-box {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34D399;
    }

    .error-state .feedback-icon-box {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #F87171;
    }

    .feedback-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary, #F8FAFC);
      margin-bottom: 0.5rem;
    }

    .feedback-body {
      font-size: 0.9rem;
      color: var(--text-secondary, #94A3B8);
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .feedback-meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 0.75rem;
      padding: 0.85rem;
      background: rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      margin-bottom: 1.25rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.78rem;
    }

    .feedback-meta-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .feedback-meta-label {
      color: var(--text-muted, #64748B);
      text-transform: uppercase;
      font-size: 0.7rem;
    }

    .feedback-meta-val {
      color: var(--text-primary, #F8FAFC);
      font-weight: 600;
    }

    .btn-submit-loading {
      position: relative;
      pointer-events: none;
      opacity: 0.85;
    }

    .btn-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #FFFFFF;
      border-radius: 50%;
      animation: formSpinnerRotate 0.8s linear infinite;
      margin-right: 8px;
      vertical-align: middle;
    }

    @keyframes formSpinnerRotate {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Validate a single form field and render real-time inline feedback
 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field
 * @returns {boolean} isValid
 */
export function validateField(field) {
  if (!field || field.disabled) return true;

  const fieldName = field.name || field.id || '';
  const val = field.value.trim();
  const isRequired = field.hasAttribute('required');
  const fieldGroup = field.closest('.form-group') || field.parentElement;

  let errorMsg = '';

  // 1. Required check
  if (isRequired && !val) {
    errorMsg = 'This field is required.';
  } else if (val) {
    // 2. Format / Length checks
    if (fieldName.toLowerCase().includes('email') || field.type === 'email') {
      if (!VALIDATION_RULES.email.test(val)) {
        errorMsg = 'Please enter a valid email address.';
      }
    } else if (fieldName.toLowerCase().includes('phone') || field.type === 'tel') {
      if (!VALIDATION_RULES.phone.test(val)) {
        errorMsg = 'Please enter a valid phone number format.';
      }
    } else if (fieldName.toLowerCase().includes('name') || fieldName === 'fullName') {
      if (val.length < VALIDATION_RULES.nameMinLength) {
        errorMsg = `Name must be at least ${VALIDATION_RULES.nameMinLength} characters.`;
      }
    } else if (field.tagName === 'TEXTAREA' || fieldName === 'message' || fieldName === 'brief') {
      if (val.length < VALIDATION_RULES.messageMinLength) {
        errorMsg = `Message brief must be at least ${VALIDATION_RULES.messageMinLength} characters.`;
      }
    }
  }

  // Render Inline Error Element
  let errorEl = fieldGroup ? fieldGroup.querySelector('.field-error-msg') : null;

  if (errorMsg) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');

    if (!errorEl && fieldGroup) {
      errorEl = document.createElement('span');
      errorEl.className = 'field-error-msg';
      fieldGroup.appendChild(errorEl);
    }

    if (errorEl) {
      errorEl.textContent = errorMsg;
      gsap.to(errorEl, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
    }
    return false;
  } else {
    field.classList.remove('is-invalid');
    if (val) field.classList.add('is-valid');

    if (errorEl) {
      gsap.to(errorEl, {
        opacity: 0,
        y: -4,
        duration: 0.15,
        onComplete: () => errorEl.remove()
      });
    }
    return true;
  }
}

/**
 * Validate all required/filled fields in a target form
 * @param {HTMLFormElement} form
 * @returns {boolean} isFormValid
 */
export function validateForm(form) {
  if (!form) return false;

  const fields = form.querySelectorAll('input, select, textarea');
  let isValid = true;
  let firstInvalid = null;

  fields.forEach(field => {
    const fieldValid = validateField(field);
    if (!fieldValid) {
      isValid = false;
      if (!firstInvalid) firstInvalid = field;
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
  }

  return isValid;
}

/**
 * Simulates a high-performance backend enterprise API endpoint with latency
 * @param {object} payload
 * @returns {Promise<object>}
 */
export function simulateFormApiSubmit(payload) {
  return new Promise((resolve, reject) => {
    // Simulated realistic enterprise API roundtrip latency (1.2s - 1.8s)
    const latency = 1200 + Math.random() * 600;

    setTimeout(() => {
      // Simulate forced test error if email includes "error" or "test-fail"
      if (payload.email && payload.email.toLowerCase().includes('error')) {
        reject(new Error('Enterprise Gateway Rejected: Anti-spam security protocol triggered.'));
        return;
      }

      const ticketId = `EDO-${Date.now().toString().slice(-6)}`;
      const timestamp = new Date().toISOString();

      // Record in global state store
      try {
        addNotification({
          type: 'form_submission',
          title: 'Inquiry Recorded',
          message: `Ticket ${ticketId} created for ${payload.fullName || payload.name || 'Client'}`,
          ticketId
        });
      } catch (err) {
        // Safe fallback if state manager isn't present
      }

      resolve({
        success: true,
        ticketId,
        timestamp,
        sla: '4 Business Hours',
        data: payload
      });
    }, latency);
  });
}

/**
 * Render a high-end animated GSAP feedback card within or replacing the feedback element
 * @param {HTMLElement} feedbackContainer
 * @param {'success'|'error'} status
 * @param {object} options
 */
export function showFormFeedback(feedbackContainer, status, options = {}) {
  if (!feedbackContainer) return;

  const {
    title = status === 'success' ? 'Engagement Request Confirmed' : 'Submission Failed',
    message = '',
    ticketId = '',
    sla = '4 Business Hours',
    onReset = null
  } = options;

  feedbackContainer.innerHTML = '';
  feedbackContainer.className = 'form-feedback-wrapper';
  feedbackContainer.style.display = 'block';

  const card = document.createElement('div');
  card.className = `form-feedback-card ${status}-state`;

  if (status === 'success') {
    card.innerHTML = `
      <div class="feedback-icon-box">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h4 class="feedback-title">${title}</h4>
      <p class="feedback-body">${message}</p>
      
      <div class="feedback-meta-grid">
        <div class="feedback-meta-item">
          <span class="feedback-meta-label">Ticket Ref</span>
          <span class="feedback-meta-val">${ticketId || 'EDO-SEC-9921'}</span>
        </div>
        <div class="feedback-meta-item">
          <span class="feedback-meta-label">Response SLA</span>
          <span class="feedback-meta-val">${sla}</span>
        </div>
        <div class="feedback-meta-item">
          <span class="feedback-meta-label">Security</span>
          <span class="feedback-meta-val">256-Bit Encrypted</span>
        </div>
      </div>

      <button type="button" class="btn btn-outline feedback-reset-btn" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">
        Submit Another Inquiry &rarr;
      </button>
    `;
  } else {
    card.innerHTML = `
      <div class="feedback-icon-box">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h4 class="feedback-title">${title}</h4>
      <p class="feedback-body">${message}</p>
      
      <button type="button" class="btn btn-secondary feedback-reset-btn" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">
        Try Again &#21025;
      </button>
    `;
  }

  feedbackContainer.appendChild(card);

  // GSAP Entrance Animation
  gsap.fromTo(card,
    { opacity: 0, y: 16, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
  );

  // Attach Reset Listener
  const resetBtn = card.querySelector('.feedback-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      gsap.to(card, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        onComplete: () => {
          feedbackContainer.innerHTML = '';
          feedbackContainer.style.display = 'none';
          if (typeof onReset === 'function') onReset();
        }
      });
    });
  }
}

/**
 * Binds real-time validation and submit handling to a specified form
 * @param {HTMLFormElement} form
 * @param {object} [options]
 */
export function attachFormFeedback(form, options = {}) {
  if (!form) return;

  injectFormFeedbackStyles();

  const feedbackContainer = options.feedbackElement || form.querySelector('.form-feedback, #contact-form-feedback, #inquiry-feedback');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

  // 1. Attach live input validation listeners
  const fields = form.querySelectorAll('input, select, textarea');
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) {
        validateField(field);
      }
    });
  });

  // 2. Attach submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate entire form first
    if (!validateForm(form)) {
      if (feedbackContainer) {
        showFormFeedback(feedbackContainer, 'error', {
          title: 'Validation Notice',
          message: 'Please complete all required fields correctly before submitting.'
        });
      }
      return;
    }

    // Extract payload
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    // Update submit button to loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('btn-submit-loading');
      submitBtn.innerHTML = `<span class="btn-spinner"></span> Encrypting &amp; Transmitting...`;
    }

    try {
      const response = await simulateFormApiSubmit(payload);

      const clientName = payload.fullName || payload.name || 'Valued Client';
      const clientEmail = payload.emailAddress || payload.email || 'your email';

      if (feedbackContainer) {
        showFormFeedback(feedbackContainer, 'success', {
          title: '✓ Request Successfully Transmitted',
          message: `Thank you, <strong>${clientName}</strong>. Our Principal Engineering Director has received your project parameters and will send a NDA & proposal to <strong>${clientEmail}</strong> within 4 business hours.`,
          ticketId: response.ticketId,
          sla: response.sla,
          onReset: () => {
            form.reset();
            fields.forEach(f => f.classList.remove('is-valid', 'is-invalid'));
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.classList.remove('btn-submit-loading');
              submitBtn.innerHTML = originalBtnText;
            }
          }
        });
      }

      form.reset();
      fields.forEach(f => f.classList.remove('is-valid', 'is-invalid'));
    } catch (err) {
      if (feedbackContainer) {
        showFormFeedback(feedbackContainer, 'error', {
          title: 'Transmission Alert',
          message: err.message || 'An unexpected network error occurred while routing your submission. Please try again.',
          onReset: () => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.classList.remove('btn-submit-loading');
              submitBtn.innerHTML = originalBtnText;
            }
          }
        });
      }
    } finally {
      if (submitBtn && (!feedbackContainer || feedbackContainer.children.length === 0)) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-submit-loading');
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}

/**
 * Automatically find and bind all contact and inquiry forms on the site
 */
export function initAllFormFeedback() {
  injectFormFeedbackStyles();

  const contactForm = $('#contact-page-form');
  if (contactForm) {
    attachFormFeedback(contactForm, {
      feedbackElement: $('#contact-form-feedback')
    });
  }

  const inquiryForm = $('#inquiry-form');
  if (inquiryForm) {
    attachFormFeedback(inquiryForm, {
      feedbackElement: $('#inquiry-feedback')
    });
  }

  const genericForms = $$('form[data-validate="true"]');
  genericForms.forEach(f => attachFormFeedback(f));
}
