import { initTheme } from './theme.js';
import { initScrollAndNav } from './scroll.js';

function init() {
  initTheme();
  initScrollAndNav();
}

// Run on initial page load
init();

// Rerun on page transition to re-attach event listeners
document.addEventListener('astro:after-swap', init);
