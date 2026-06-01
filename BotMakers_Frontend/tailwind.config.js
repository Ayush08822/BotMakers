/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      opacity: {
        '8' : '0.08'
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#0a0a0f',
          soft: '#13131a',
          muted: '#1e1e2a',
        },
        accent: {
          DEFAULT: '#6ee7b7',   // emerald-ish mint
          dim: '#34d399',
          glow: '#a7f3d0',
        },
        danger: '#f87171',
        warn: '#fbbf24',
      },
      boxShadow: {
        glow: '0 0 24px 4px rgba(110,231,183,0.18)',
        'glow-sm': '0 0 10px 2px rgba(110,231,183,0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease both',
        'fade-up-delay': 'fade-up 0.5s 0.15s ease both',
        'fade-up-delay2': 'fade-up 0.5s 0.3s ease both',
        'fade-in': 'fade-in 0.4s ease both',
        pulse2: 'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
