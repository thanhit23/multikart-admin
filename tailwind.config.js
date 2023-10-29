/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      white: '#fff',
      blue: '#1fb6ff',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      gray: '#8492a6',
      transparent: 'transparent',
      cancelled: '#e94560',
      pending: '#4e97fd',
      processing: '#ffcd4e',
      delivered: '#33d067',
    },
    backgroundColors: {
      cancelled: '#ffeaea',
      pending: '#dbf0fe',
      processing: '#fff8e5',
      delivered: '#E7F9ED',
    },
    boxShadow: {
      default: '0 0 5px 2px #d8d8d8',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      top: {
        '100+10': 'calc(100% + 10px)',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};
