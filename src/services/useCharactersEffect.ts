import { useState, useEffect } from 'react';
import { CharacterItem } from '@/components/pages/Characters/interfaces/characters';
import { BASE_URL, MAX_CHARACTERS } from '@/utils/constants';

export interface useCharactersEffectProps {
  calls: number;
  stackOrder: string;
  searchString: string;
}
export interface useCharactersEffectResponse {
  characters: CharacterItem[];
  isLoading: boolean;
  hasMore: boolean;
  error: unknown;
}

const useCharactersEffect = ({
  calls,
  stackOrder,
  searchString,
}: useCharactersEffectProps): useCharactersEffectResponse => {
  const [characters, setCharacters] = useState<CharacterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [hasMore, setHasmore] = useState(true);

  useEffect(() => {
    const KEY = process.env.REACT_APP_MARVEL_API_KEY;
    const searchQuery = searchString ? `?nameStartsWith=${searchString}&` : '?';
    const order = stackOrder;
    const offset = calls > 0 ? MAX_CHARACTERS * calls : 0;
    const url = `${BASE_URL}${searchQuery}orderBy=${order}&limit=${MAX_CHARACTERS}&offset=${offset}&apikey=${KEY}`;

    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP STATUS: ${response.status}`);
        }
        const res = await response.json();
        const results = res.data.results;
        if (res.data.results) {
          setHasmore(true);
          const characters = res.data.results;
          setCharacters(characters);
        } else {
          setHasmore(false);
        }
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [calls, stackOrder, searchString]);

  return { characters, isLoading, hasMore, error };
};

export default useCharactersEffect;
