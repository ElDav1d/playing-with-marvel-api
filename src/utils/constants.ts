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

const HERO_BACKGROUND_URL = 'https://cdn.marvel.com/content/1x/characters_art_mas_mob_01.jpg';

const EMPTY_DATA_LITERAL_LIST =
    // eslint-disable-next-line quotes
    "Sorry, none of our characters' name matches your search! Try typing again";

    const SELECT_ORDER_LITERALS = [
      'By name A/Z',
      'By name Z/A',
      'By modification First/Last',
      'By modification Last/First',
    ];
  

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
  HERO_BACKGROUND_URL,
  EMPTY_DATA_LITERAL_LIST,
  SELECT_ORDER_LITERALS
};
