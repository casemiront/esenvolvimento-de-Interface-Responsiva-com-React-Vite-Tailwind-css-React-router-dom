/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F0E8',
        ink: '#1A1410',
        sepia: '#8B6914',
        rust: '#C1440E',
        aged: '#D4C5A9',
        stamp: '#5C3D2E',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Courier Prime"', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
}
