/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#f9f4e8',
          200: '#f3e8c9',
          300: '#ead9a1',
          400: '#dfc570',
          500: '#d4af37',
          600: '#b8941f',
          700: '#8b7355',
          800: '#6b5a42',
          900: '#4a3d2c',
        },
      },
      backgroundColor: {
        'dark-primary': '#0f0f0f',
        'dark-secondary': '#1a1a1a',
        'dark-card': '#1e1e1e',
        'dark-card-hover': '#2a2a2a',
      },
      textColor: {
        'dark-primary': '#ffffff',
        'dark-secondary': '#e5e5e5',
      },
    },
  },
  plugins: [],
}
