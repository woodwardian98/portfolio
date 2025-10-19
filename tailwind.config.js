// src/tailwind.config.js

import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */ // Add this JSDoc for better type hints
export default { // Use export default for ESM compatibility
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use the imported 'daisyui' variable directly
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
};