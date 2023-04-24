import { BASE_URL, MAX_CHARACTERS } from '@/utils/constants';
import { CharacterItem } from '../interfaces/characters';

const getCharactersService = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const offset = pageParam * MAX_CHARACTERS;
  const order = 'name';
  const KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const url = `${BASE_URL}?orderBy=${order}&limit=${MAX_CHARACTERS}&offset=${offset}&apikey=${KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP STATUS: ${response.status}`);
    }

    const res = await response.json();
    const results = res.data.results;

    const characters = results.filter((character: CharacterItem) => character !== undefined);

    return characters;
  } catch (error) {
    console.log(error);
  }
};

export default getCharactersService;
