/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purgatory-dark': '#0a0a0a',
        'purgatory-darker': '#050505',
        'ghost-green': '#00ff41',
        'ghost-green-dim': '#00cc33',
        'tombstone-gray': '#2a2a2a',
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px #00ff41' },
          '50%': { textShadow: '0 0 20px #00ff41' },
        },
      },
    },
  },
  plugins: [],
}
