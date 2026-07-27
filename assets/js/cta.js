/**
 * EDOERS Inquiry & Project Initiation Engine
 */

import { attachFormFeedback } from './form-feedback.js';
import { $ } from './utils.js';

export function initInquiryEngine() {
  const form = $('#inquiry-form');
  const feedback = $('#inquiry-feedback');

  if (form) {
    attachFormFeedback(form, {
      feedbackElement: feedback
    });
  }
}

