import { useState, useEffect } from 'react';
import { BASE_URL } from '@/utils/constants';

const useCharacterDetailEffect = (id: string | undefined) => {
  const [characterData, setCharacter] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const KEY = process.env.REACT_APP_MARVEL_API_KEY;
    const url = `${BASE_URL}/${id}?apikey=${KEY}`;

    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP STATUS: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.data.results[0]) {
          setCharacter(data.data.results[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { characterData, isLoading, error };
};

export default useCharacterDetailEffect;
