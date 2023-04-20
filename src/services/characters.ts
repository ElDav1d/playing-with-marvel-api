import { BASE_URL, MAX_CHARACTERS } from '@/utils/constants';

const getCharactersService = async () => {
  const order = 'name';
  const KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const url = `${BASE_URL}?orderBy=${order}&limit=${MAX_CHARACTERS}&apikey=${KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP STATUS: ${response.status}`);
    }

    const res = await response.json();
    const results = res.data.results;

    const characters = [...results].map(({ name, description, thumbnail, id, modified }) => {
      return { name, description, thumbnail, id, modified };
    });

    return characters;
  } catch (error) {
    console.log(error);
  }
};

export default getCharactersService;
