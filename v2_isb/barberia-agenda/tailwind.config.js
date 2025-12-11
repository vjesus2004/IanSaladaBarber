/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        barberia: {
          dark: '#1a1a1a',
          gold: '#d4af37',
          red: '#8b0000',
          gray: '#2d2d2d',
        }
      }
    },
  },
  plugins: [],
}