import { MARVEL_RED, HERO_BACKGROUND_URL, LOGO_DEFAULT_HEIGHT, TRANSITION_TIMING } from './src/utils/constants';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        appearFromTop: `appearFromTop ${TRANSITION_TIMING.s} ease-in-out`,
      },

      backgroundImage: {
        'hero-image': `url(${HERO_BACKGROUND_URL})`,
      },
      colors: {
        red: MARVEL_RED,
        'trans-0.75-black': 'rgba(0, 0, 0, 0.75)',
        'trans-0.5-black': 'rgba(0, 0, 0, 0.5)',
      },
      fontSize: {
        none: '0px',
        xs: '0.75rem',
      },
      gridTemplateColumns: {
        'auto-min-max-120-auto': 'repeat(auto-fill, minmax(120px, auto))',
        'auto-min-max-185-auto': 'repeat(auto-fill, minmax(185px, auto))',
      },
      keyframes: {
        appearFromTop: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        }
      },
      spacing: {
        logoDefaultHeight: `${LOGO_DEFAULT_HEIGHT}`,
      },
      transitionDelay: {
        s: `${TRANSITION_TIMING.s}`,
      },
      transitionDuration: {
        m: `${TRANSITION_TIMING.m}`,
        l: `${TRANSITION_TIMING.l}`,
      },
      zIndex: {
        1: '1'
      }
    },
  },
  plugins: [],
};
