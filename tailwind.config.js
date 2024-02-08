import { MARVEL_RED, HERO_BACKGROUND_URL } from './src/utils/constants';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': `url(${HERO_BACKGROUND_URL})`,
      },
      colors: {
        red: MARVEL_RED,
        'trans-0.75-black': 'rgba(0, 0, 0, 0.75)',
      },
      fontSize: {
        none: '0px',
        xs: '0.75rem',
      },
      gridTemplateColumns: {
        'auto-min-max-120-auto': 'repeat(auto-fill, minmax(120px, auto))',
        'auto-min-max-195-auto': 'repeat(auto-fill, minmax(195px, auto))',
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
