import { MARVEL_RED } from './src/utils/constants';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: MARVEL_RED,
      },
      fontSize: {
        none: '0px',
        xs: '0.75rem',
      },
      gridTemplateColumns: {
        'auto-min-max-120-auto': 'repeat(auto-fill, minmax(120px, auto))',
        'auto-min-max-190-auto': 'repeat(auto-fill, minmax(190px, auto))',
      },
      transitionDelay: {
        gridItem: '50ms',
      },
      transitionDuration: {
        gridItem: '750ms',
      },
    },
  },
  plugins: [],
};
