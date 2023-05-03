import { BASE_URL } from '@/utils/constants';

export interface getCharacterComicsServiceProps {
  page: number;
  characterId: string | undefined;
  maxComics: number;
}

const getCharacterComicsService = async ({
  page,
  characterId,
  maxComics,
}: getCharacterComicsServiceProps) => {
  const offset = maxComics * page;
  const KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const url = `${BASE_URL}/${characterId}/comics?limit=${maxComics}&offset=${offset}&apikey=${KEY}`;

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
