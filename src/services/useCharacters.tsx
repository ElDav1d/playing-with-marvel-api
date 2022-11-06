import { useState, useEffect } from 'react';
import { CharacterItem } from '../interfaces/globals';

export interface useCharactersProps {
  calls: number;
  stackOrder: string;
}
export interface useCharactersResponse {
  characters: CharacterItem[];
  isLoading: boolean;
  error: unknown;
}

const useCharacters = ({ calls, stackOrder }: useCharactersProps): useCharactersResponse => {
  const [characters, setCharacters] = useState<CharacterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const BASE = 'https://gateway.marvel.com:443/v1/public/characters';
    const KEY = 'd6f5c6bef1ef684786df6962910eb6ce';
    const MAX_CHARACTERS = 100;
    const order = stackOrder;
    const offset = MAX_CHARACTERS * calls;
    const url = `${BASE}?orderBy=${order}&limit=${MAX_CHARACTERS}&offset=${offset}&apikey=${KEY}`;

    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP STATUS: ${response.status}`);
        }
        const res = await response.json();
        setCharacters(res.data.results);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [calls, stackOrder]);

  return { characters, isLoading, error };
};

export default useCharacters;
