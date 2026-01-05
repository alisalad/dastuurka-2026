/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          'Inter',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'Apple Color Emoji',
          'Segoe UI Emoji'
        ],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56,189,248,.25), 0 10px 30px rgba(56,189,248,.15)',
      },
    },
  },
  plugins: [],
};
