import { useState, useEffect } from 'react';
import { Character } from '../components/molecules/CharactersList/CharactersList';

const useCharacters = (calls: number) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const MAX_CHARACTERS = 5;
      const offset = MAX_CHARACTERS * calls;
      const url = `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=${MAX_CHARACTERS}&offset=${offset}&apikey=d6f5c6bef1ef684786df6962910eb6ce`;

      try {
        setIsLoading(true);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP STATUS: ${response.status}`);
        }

        const res = await response.json();
        setCharacters(res.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [calls]);

  return { characters, isLoading };
};

export default useCharacters;
