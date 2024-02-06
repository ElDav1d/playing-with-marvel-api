import { MediaBreakpoints } from '@/interfaces/globals';

const BASE_URL = 'https://gateway.marvel.com:443/v1/public/characters';

const MAX_FETCH_CHARACTERS_DEFAULT = 30;
const MAX_FETCH_CHARACTERS_OPTIM = 50;
const MAX_FETCH_CHARACTERS_TOP = 100;

const MAX_FETCH_CHARACTER_COMICS = 10;

const MARVEL_RED = '#EC1D24';

const LOADER_SIZE = 40;

const REGEX_IMAGE_PATH = /image_not_available/g;

const MEDIA_BREAKPOINTS: MediaBreakpoints = {
  MD: 768,
};

export {
  BASE_URL,
  MAX_FETCH_CHARACTERS_DEFAULT,
  MAX_FETCH_CHARACTERS_OPTIM,
  MAX_FETCH_CHARACTERS_TOP,
  MAX_FETCH_CHARACTER_COMICS,
  MARVEL_RED,
  LOADER_SIZE,
  REGEX_IMAGE_PATH,
  MEDIA_BREAKPOINTS,
};
