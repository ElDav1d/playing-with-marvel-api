import { useState, useEffect } from 'react';
import { CharacterItem } from '@/interfaces/globals';
import { FETCHING } from '@/utils/constants';

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
    const { BASE, KEY } = FETCHING;
    const MAX_CHARACTERS = 20;
    const order = stackOrder;
    const offset = calls > 1 ? MAX_CHARACTERS * calls : 0;
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
