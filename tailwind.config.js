/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#07080a',
        charcoal: '#0d0f13',
        panel: '#121419',
        line: '#20242c',
        bone: '#eceef2',
        mist: '#8a90a0',
        signal: '#4c7cff',
        violet: '#8b7bff',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
