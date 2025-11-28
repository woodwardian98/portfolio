import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        primary: {
          DEFAULT: "#2C3E50",
          light: "#34495E",
          dark: "#233140",
        },
        secondary: {
          DEFAULT: "#8E44AD",
          light: "#9B59B6",
          dark: "#7D3C98",
        },
        accent: {
          DEFAULT: "#3498DB",
        },
        neutral: {
          white: "#FFFFFF",
          "off-white": "#F8F8F8",
          "grey-light": "#ECF0F1",
          grey: "#BDC3C7",
          "grey-dark": "#95A5A6",
          "black-soft": "#333333",
          black: "#000000",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
