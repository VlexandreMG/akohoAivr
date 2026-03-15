/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",     // ← ça dit à Tailwind de scanner tes fichiers Angular
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}