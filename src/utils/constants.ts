import { MediaBreakpoints } from '@/types/globals';

const BASE_URL = 'https://gateway.marvel.com:443/v1/public/characters';
const MAX_FETCH_CHARACTERS = 50;

const MAX_FETCH_CHARACTER_COMICS = 10;

const MEDIA_BREAKPOINTS: MediaBreakpoints = {
  MD: 768,
};

const HERO_BACKGROUND_URL = 'https://cdn.marvel.com/content/1x/characters_art_mas_mob_01.jpg';

const SEARCH_PLACEHOLDER = 'type a character name';
const SEARCH_TITLE = 'Search by name';
const EMPTY_SEARCH_RESULTS_LITERAL =
  // eslint-disable-next-line quotes
  "Sorry, none of our characters' name matches your search! Try typing again";
const HERO_TITLE_LITERAL = 'Marvel Characters';
const HERO_PARAGRAPH_LITERAL =
  'Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!';

const CLEAR_BUTTON_LITERAL = 'clear';
const NEXT_BUTTON_LITERAL = 'next';
const PREVIOUS_BUTTON_LITERAL = 'previous';

const LOGO_DEFAULT_HEIGHT = '52px';

const TRANSITION_TIMING = new Map<string, string>();
TRANSITION_TIMING.set('s', '50ms');
TRANSITION_TIMING.set('m', '250ms');
TRANSITION_TIMING.set('l', '750ms');

const DEBOUNCE_DELAY = 500;

export {
  BASE_URL,
  MAX_FETCH_CHARACTERS,
  MAX_FETCH_CHARACTER_COMICS,
  MEDIA_BREAKPOINTS,
  HERO_BACKGROUND_URL,
  SEARCH_PLACEHOLDER,
  SEARCH_TITLE,
  EMPTY_SEARCH_RESULTS_LITERAL,
  HERO_TITLE_LITERAL,
  HERO_PARAGRAPH_LITERAL,
  CLEAR_BUTTON_LITERAL,
  NEXT_BUTTON_LITERAL,
  PREVIOUS_BUTTON_LITERAL,
  LOGO_DEFAULT_HEIGHT,
  TRANSITION_TIMING,
  DEBOUNCE_DELAY,
};
