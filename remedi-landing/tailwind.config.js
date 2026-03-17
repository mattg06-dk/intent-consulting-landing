/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Remedi Health–inspired palette within Preset D "Vapor Clinic" structure
        primary: '#08121C', // deep clinic navy (page background)
        accent: '#2FB9A9', // teal accent for CTAs and highlights
        accentSoft: '#7BE3D5',
        background: '#F3F7FB',
        surface: '#101824',
        muted: '#64748B',
        borderSoft: 'rgba(148, 163, 184, 0.35)',
        success: '#4ADE80',
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        drama: ['"Instrument Serif"', 'serif'],
        data: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        '2xl-soft': '2rem',
        '3xl-soft': '3rem',
        '4xl-soft': '4rem',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.55)',
        surface: '0 18px 60px rgba(15, 23, 42, 0.35)',
      },
      keyframes: {
        noise: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '10%': { transform: 'translate3d(-5%, -10%, 0)' },
          '20%': { transform: 'translate3d(-15%, 5%, 0)' },
          '30%': { transform: 'translate3d(7%, -25%, 0)' },
          '40%': { transform: 'translate3d(-5%, 25%, 0)' },
          '50%': { transform: 'translate3d(-15%, 10%, 0)' },
          '60%': { transform: 'translate3d(15%, 0, 0)' },
          '70%': { transform: 'translate3d(0, 15%, 0)' },
          '80%': { transform: 'translate3d(3%, 35%, 0)' },
          '90%': { transform: 'translate3d(-10%, 10%, 0)' },
          '100%': { transform: 'translate3d(0,0,0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.08)' },
        },
        cursorBlink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
      },
      animation: {
        noise: 'noise 1.8s steps(2,end) infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'cursor-blink': 'cursorBlink 1.1s steps(2,start) infinite',
      },
    },
  },
  plugins: [],
}

