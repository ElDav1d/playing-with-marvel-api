import { FetchingOrder, ICharacterItem } from '@/components/pages/Characters/interfaces/characters';
import { BASE_URL } from '@/utils/constants';
import { Bugfender } from '@bugfender/sdk';

export interface IGetCharactersServiceProps {
  pageParam?: number;
  maxCharacters: number;
  searchString: string;
  order: FetchingOrder;
}

const getCharactersService = async ({
  pageParam = 0,
  maxCharacters,
  searchString,
  order,
}: IGetCharactersServiceProps) => {
  const searchQuery = searchString ? `?nameStartsWith=${searchString}&` : '?';
  const fetchingOrder = order;
  const offset = maxCharacters * pageParam;
  const KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const url = `${BASE_URL}${searchQuery}orderBy=${fetchingOrder}&limit=${maxCharacters}&offset=${offset}&apikey=${KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      Bugfender.error(`HTTP STATUS: ${response.status}`);
      throw new Error(`HTTP STATUS: ${response.status}`);
    }

    const res = await response.json();

    const characters = res.data.results.filter(
      (character: ICharacterItem) => character !== undefined,
    );

    const getNextCursor = () => {
      const hasMoreResults = maxCharacters * (pageParam + 1) < res.data.total;

      Bugfender.log(`ON NEXT CURSOR Characters fetched: ${characters.length}`);

      return hasMoreResults ? pageParam + 1 : null;
    };

    Bugfender.log(`Characters fetched: ${characters.length}`);

    return { characters, nextCursor: getNextCursor() };
  } catch (error) {
    Bugfender.error(error);
    console.log(error);
  }
};

export default getCharactersService;
