import { BASE_URL } from '@/utils/constants';
import { FetchingOrder } from '../../../organisms/CharacterComicList/interfaces/characterComics';

export interface getCharacterComicsServiceProps {
  page: number;
  characterId: string | undefined;
  maxComics: number;
  order: FetchingOrder;
}

const getCharacterComicsService = async ({
  page,
  characterId,
  order,
  maxComics,
}: getCharacterComicsServiceProps) => {
  const fetchingOrder = order;
  const offset = maxComics * page;
  const KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const url = `${BASE_URL}/${characterId}/comics?orderBy=${fetchingOrder}&limit=${maxComics}&offset=${offset}&apikey=${KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP STATUS: ${response.status}`);
    }

    const res = await response.json();

    return { apiData: res.data, offset };
  } catch (error) {
    console.log(error);
  }
};

export default getCharacterComicsService;
