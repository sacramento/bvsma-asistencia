/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bombero-red': '#C41E3A',
        'bombero-red-dark': '#9d182f',
        'bombero-dark': '#1a1a1a',
        'bombero-gray': '#F5F5F5',
        'bombero-light': '#FFFFFF',
        'status-presente': '#4CAF50',
        'status-tarde': '#FF9800',
        'status-ausente': '#F44336',
        'status-licencia': '#607D8B'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}