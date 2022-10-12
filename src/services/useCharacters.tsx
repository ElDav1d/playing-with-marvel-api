import { useState, useEffect } from 'react';
import { Character } from '../components/molecules/CharactersList/CharactersList';

export interface useCharactersProps {
  calls: number;
  stackOrder: string;
}

const useCharacters = ({ calls, stackOrder }: useCharactersProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const BASE = 'https://gateway.marvel.com:443/v1/public/characters';
    const KEY = 'd6f5c6bef1ef684786df6962910eb6ce';
    const MAX_CHARACTERS = 5;
    const order = stackOrder;
    const offset = MAX_CHARACTERS * calls;
    const url = `${BASE}?orderBy=${order}&limit=${MAX_CHARACTERS}&offset=${offset}&apikey=${KEY}`;

    (async function () {
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
  }, [calls, stackOrder]);

  return { characters, isLoading };
};

export default useCharacters;
