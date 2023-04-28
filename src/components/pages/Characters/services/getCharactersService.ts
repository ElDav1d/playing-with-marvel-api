import { BASE_URL } from '@/utils/constants';
import { CharacterItem, FetchingOrder } from '../interfaces/characters';

const getCharactersService = async ({
  pageParam = 0,
  maxCharacters,
  order,
}: {
  pageParam?: number;
  maxCharacters: number;
  order: FetchingOrder;
}) => {
  const offset = maxCharacters * pageParam;
  const fetchingOrder = order;
  const KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const url = `${BASE_URL}?orderBy=${fetchingOrder}&limit=${maxCharacters}&offset=${offset}&apikey=${KEY}`;

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
      const hasMoreResults = maxCharacters * (pageParam + 1) < res.data.total;

      return hasMoreResults ? pageParam + 1 : null;
    };

    return { characters, nextCursor: getNextCursor() };
  } catch (error) {
    console.log(error);
  }
};

export default getCharactersService;
