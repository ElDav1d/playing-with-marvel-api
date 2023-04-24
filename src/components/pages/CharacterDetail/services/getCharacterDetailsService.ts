import { BASE_URL } from '@/utils/constants';

const getCharacterDetailsService = async (id: string | undefined) => {
  const KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const url = `${BASE_URL}/${id}?apikey=${KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP STATUS: ${response.status}`);
    }

    const res = await response.json();

    return res.data.results[0];
  } catch (error) {
    console.log(error);
  }
};

export default getCharacterDetailsService;
