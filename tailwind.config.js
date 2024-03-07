import { MARVEL_RED, HERO_BACKGROUND_URL, LOGO_DEFAULT_HEIGHT } from './src/utils/constants';
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
        'auto-min-max-185-auto': 'repeat(auto-fill, minmax(185px, auto))',
      },
      spacing: {
        logoDefaultHeight: `${LOGO_DEFAULT_HEIGHT}px`,
      },
      transitionDelay: {
        gridItem: '50ms',
      },
      transitionDuration: {
        header: '250ms',
        gridItem: '750ms',
      },
      zIndex: {
        1: '1'
      }
    },
  },
  plugins: [],
};
