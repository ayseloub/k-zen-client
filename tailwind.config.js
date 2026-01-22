/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
      colors: {
        'Kzen-primary': '#0e73b7',
        'Kzen-secondary': '#4dbad7',
        'Kzen-accents': '#2aa85f',
        'Kzen-neutral': '#b3b3b3',
        'Kzen-light': '#f9f9f9',
        'Kzen-dark': '#151515',
      },
    },
  },
  plugins: [],
};