/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0f1419',
        'cyber-dark': '#1a1a2e',
        'cyber-blue': '#0f3460',
        'cyber-teal': '#0caba8',
        'cyber-pink': '#e94560',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.cyan.400"), 0 0 20px theme("colors.cyan.600")',
      },
    },
  },
  plugins: [],
};