import { useState, useEffect } from 'react';
import { Character } from '../components/molecules/CharactersList/CharactersList';

export interface useCharactersProps {
  calls: number;
  stackOrder: string;
}
export interface useCharactersResponse {
  characters: Character[];
  isLoading: boolean;
  error: unknown;
}

const useCharacters = ({ calls, stackOrder }: useCharactersProps): useCharactersResponse => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const BASE = 'https://gateway.marvel.com:443/v1/public/characters';
    const KEY = 'd6f5c6bef1ef684786df6962910eb6ce';
    const MAX_CHARACTERS = 5;
    const order = stackOrder;
    const offset = MAX_CHARACTERS * calls;
    const url = `${BASE}?orderBy=${order}&limit=${MAX_CHARACTERS}&offset=${offset}&apikey=${KEY}`;

    setIsLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP STATUS ${response.status}`);
        return response.json();
      })
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [calls, stackOrder]);

  return { characters, isLoading, error };
};

export default useCharacters;
