import { MARVEL_RED } from './src/utils/constants';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        none: '0px',
        xs: '0.75rem',
      },
      colors: {
        red: MARVEL_RED,
      },
      transitionDuration: {
        gridItem: '750ms',
      },
      transitionDelay: {
        gridItem: '50ms',
      },
    },
  },
  plugins: [],
};
