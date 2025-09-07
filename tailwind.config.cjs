/**** Tailwind Configuration for Periodic Table App ****/
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81'
        },
      },
      boxShadow: {
        'glass': '0 4px 24px -2px rgba(0,0,0,0.25)',
      },
      backdropBlur: {
        xs: '2px'
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      },
      transitionDuration: {
        'fast': '120ms'
      }
      ,
      gridTemplateColumns: {
        18: 'repeat(18, minmax(0, 1fr))'
      }
    },
  },
  plugins: [],
};
