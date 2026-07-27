/**
 * EDOERS Preloader Module (Disabled per user request for direct smooth page transitions)
 */

export function initPreloader(onCompleteCallback) {
  // Page loader disabled for instant smooth page loads
  if (typeof onCompleteCallback === 'function') {
    onCompleteCallback();
  }
}

export function triggerViewPreloader(transitionAction, onDone) {
  // Page loader disabled for direct smooth view cross-fade transitions
  if (typeof transitionAction === 'function') {
    transitionAction();
  }
  if (typeof onDone === 'function') {
    onDone();
  }
}
