import { MediaBreakpoints } from '@/types/globals';

const BASE_URL = 'https://gateway.marvel.com:443/v1/public/characters';
const MAX_FETCH_CHARACTERS = 50;

const MAX_FETCH_CHARACTER_COMICS = 10;

const MARVEL_RED = '#EC1D24';

const LOADER_SIZE = 40;

const REGEX_IMAGE_PATH = /image_not_available/g;

const MEDIA_BREAKPOINTS: MediaBreakpoints = {
  MD: 768,
};

const HERO_BACKGROUND_URL = 'https://cdn.marvel.com/content/1x/characters_art_mas_mob_01.jpg';

const EMPTY_DATA_LITERAL_LIST =
  // eslint-disable-next-line quotes
  "Sorry, none of our characters' name matches your search! Try typing again";

const LOGO_DEFAULT_HEIGHT = '52px';

const TRANSITION_TIMING = new Map<string, string>();
TRANSITION_TIMING.set('s', '50ms');
TRANSITION_TIMING.set('m', '250ms');
TRANSITION_TIMING.set('l', '750ms');

export {
  BASE_URL,
  MAX_FETCH_CHARACTERS,
  MAX_FETCH_CHARACTER_COMICS,
  MARVEL_RED,
  LOADER_SIZE,
  REGEX_IMAGE_PATH,
  MEDIA_BREAKPOINTS,
  HERO_BACKGROUND_URL,
  EMPTY_DATA_LITERAL_LIST,
  LOGO_DEFAULT_HEIGHT,
  TRANSITION_TIMING,
};
