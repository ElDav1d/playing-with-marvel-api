import { BASE_URL, MAX_CHARACTERS } from '@/utils/constants';
import { CharacterItem } from '../interfaces/characters';

const getCharactersService = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const offset = MAX_CHARACTERS * pageParam;
  const order = 'name';
  const KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const url = `${BASE_URL}?orderBy=${order}&limit=${MAX_CHARACTERS}&offset=${offset}&apikey=${KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP STATUS: ${response.status}`);
    }

    const res = await response.json();

    const characters = res.data.results.filter(
      (character: CharacterItem) => character !== undefined,
    );

    const getNextCursor = () => {
      const hasMoreResults = MAX_CHARACTERS * (pageParam + 1) < res.data.total;

      return hasMoreResults ? pageParam + 1 : null;
    };

    return { characters, nextCursor: getNextCursor() };
  } catch (error) {
    console.log(error);
  }
};

export default getCharactersService;
