/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aqua: {
          50: '#f0f9fa',
          100: '#e0f3f6',
          200: '#c0e7ec',
          300: '#a0dbe3',
          400: '#80cfda',
          500: '#00BCD4',
          600: '#00a8c8',
          700: '#0094b4',
          800: '#0080a0',
          900: '#006c8c',
        },
      },
    },
  },
  plugins: [],
};
