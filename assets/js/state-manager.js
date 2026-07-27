/**
 * EDOERS Proxy-Based State Engine
 * Implements a reactive state store using JavaScript Proxy and Observer Pattern
 * Handles application-wide state (current view, theme, user session, modal state)
 * with automatic localStorage persistence and cross-component/cross-tab synchronization.
 */

const STORAGE_KEYS = {
  theme: 'edoers_theme_preference',
  userSession: 'edoers_user_session',
  lastView: 'edoers_last_view'
};

// Initial default application state
const defaultState = {
  currentView: 'home',
  activeProjectId: null,
  theme: localStorage.getItem(STORAGE_KEYS.theme) || 'dark',
  userSession: loadStoredSession(),
  activeFilter: 'all',
  activeModal: null,
  notifications: []
};

// Observer subscribers store
const subscribers = new Map();
const globalSubscribers = new Set();

/**
 * Load persisted user session from storage safely
 */
function loadStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.userSession);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Failed to parse stored user session:', err);
    return null;
  }
}

/**
 * Save state properties to localStorage for persistent synchronization
 */
function persistStateProperty(key, value) {
  try {
    if (key === 'theme' && value) {
      localStorage.setItem(STORAGE_KEYS.theme, value);
    } else if (key === 'userSession') {
      if (value) {
        localStorage.setItem(STORAGE_KEYS.userSession, JSON.stringify(value));
      } else {
        localStorage.removeItem(STORAGE_KEYS.userSession);
      }
    } else if (key === 'currentView' && value) {
      localStorage.setItem(STORAGE_KEYS.lastView, value);
    }
  } catch (err) {
    console.warn(`Failed to persist key "${key}" to storage:`, err);
  }
}

/**
 * Notify all subscribed observers of state changes
 */
function notifySubscribers(key, newValue, oldValue) {
  // Key-specific subscribers
  if (subscribers.has(key)) {
    subscribers.get(key).forEach(callback => {
      try {
        callback(newValue, oldValue, stateProxy);
      } catch (err) {
        console.error(`Error in state observer for "${key}":`, err);
      }
    });
  }

  // Global subscribers watching any state change
  globalSubscribers.forEach(callback => {
    try {
      callback(key, newValue, oldValue, stateProxy);
    } catch (err) {
      console.error('Error in global state observer:', err);
    }
  });
}

// Create reactive Proxy around internal state target
const stateTarget = { ...defaultState };

const stateProxy = new Proxy(stateTarget, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    const oldValue = target[prop];

    // Avoid unnecessary updates if value hasn't changed (shallow comparison)
    if (oldValue === value && typeof value !== 'object') {
      return true;
    }

    const success = Reflect.set(target, prop, value, receiver);

    if (success) {
      persistStateProperty(prop, value);
      notifySubscribers(prop, value, oldValue);
    }

    return success;
  },
  deleteProperty(target, prop) {
    const oldValue = target[prop];
    const success = Reflect.deleteProperty(target, prop);

    if (success) {
      persistStateProperty(prop, null);
      notifySubscribers(prop, undefined, oldValue);
    }

    return success;
  }
});

/**
 * Public State Manager Interface
 */

// Export reactive state proxy directly
export const state = stateProxy;

/**
 * Subscribe to changes on a specific state key or all state changes
 * @param {string|function} keyOrFn - State property key to watch OR a global callback function
 * @param {function} [callback] - Callback function if key was specified
 * @returns {function} Unsubscribe function
 */
export function subscribe(keyOrFn, callback) {
  if (typeof keyOrFn === 'function') {
    globalSubscribers.add(keyOrFn);
    return () => globalSubscribers.delete(keyOrFn);
  }

  if (typeof keyOrFn === 'string' && typeof callback === 'function') {
    if (!subscribers.has(keyOrFn)) {
      subscribers.set(keyOrFn, new Set());
    }
    subscribers.get(keyOrFn).add(callback);

    return () => {
      const set = subscribers.get(keyOrFn);
      if (set) {
        set.delete(callback);
        if (set.size === 0) subscribers.delete(keyOrFn);
      }
    };
  }

  throw new Error('Invalid arguments passed to state subscribe()');
}

/**
 * Batch update multiple state properties atomically
 * @param {object} partialState - Key-value map of properties to update
 */
export function setState(partialState) {
  if (!partialState || typeof partialState !== 'object') return;
  Object.keys(partialState).forEach(key => {
    stateProxy[key] = partialState[key];
  });
}

/**
 * Get snapshot of current state object
 * @returns {object}
 */
export function getState() {
  return { ...stateTarget };
}

/**
 * Helper to update theme in state
 * @param {'dark'|'light'} newTheme
 */
export function setTheme(newTheme) {
  if (newTheme === 'dark' || newTheme === 'light') {
    stateProxy.theme = newTheme;
  }
}

/**
 * Helper to set current view and optional project ID
 * @param {string} viewName
 * @param {string|null} [projectId=null]
 */
export function setCurrentView(viewName, projectId = null) {
  stateProxy.activeProjectId = projectId;
  stateProxy.currentView = viewName;
}

/**
 * Helper to update user session data
 * @param {object|null} sessionData
 */
export function setUserSession(sessionData) {
  stateProxy.userSession = sessionData;
}

/**
 * Clear active user session (logout)
 */
export function clearUserSession() {
  stateProxy.userSession = null;
}

/**
 * Add a notification item to state
 * @param {object} notification
 */
export function addNotification(notification) {
  const item = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    timestamp: Date.now(),
    ...notification
  };
  stateProxy.notifications = [...stateProxy.notifications, item];
  return item.id;
}

/**
 * Listen for storage events across browser tabs/windows to keep state in sync
 */
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEYS.theme && event.newValue) {
      if (stateTarget.theme !== event.newValue) {
        stateProxy.theme = event.newValue;
      }
    } else if (event.key === STORAGE_KEYS.userSession) {
      try {
        const parsed = event.newValue ? JSON.parse(event.newValue) : null;
        stateProxy.userSession = parsed;
      } catch (err) {
        stateProxy.userSession = null;
      }
    }
  });
}
