/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: '#000000',
        forest: '#0B3D30',
        slate: '#1A2020',
        gold: '#FFD700',
        cream: '#F5F5DC',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Didot', '"Bodoni MT"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Avenir Next"', '"Helvetica Neue"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 24px rgba(255, 215, 0, 0.35), 0 0 6px rgba(255, 215, 0, 0.5)',
        'gold-intense': '0 0 38px rgba(255, 215, 0, 0.6), 0 0 12px rgba(255, 215, 0, 0.85)',
        'card-depth': '0 24px 60px rgba(0, 0, 0, 0.85)',
      }
    },
  },
  plugins: [],
};
