import { useState, useEffect } from 'react';
import { CharacterDetail} from '../interfaces/globals';
import { FETCHING } from '../utils/constants';

export interface ComicItem {
  resourceUri: string;
  name: string;
}
export interface UseCharacterResponse {
  character: CharacterDetail;
  isLoading: boolean;
  error: unknown;
}

const useCharacter = (id: string | undefined): UseCharacterResponse => {
  const initCharacter = {
    name: '',
    description: '',
    thumbnail: { path: '', extension: '' },
    comics: [],
  };

  const [character, setCharacter] = useState<CharacterDetail>(initCharacter);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { BASE, KEY } = FETCHING;
    const url = `${BASE}/${id}?apikey=${KEY}`;

    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP STATUS: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const characterData = data.data.results[0];
        setCharacter({
          name: characterData.name,
          description: characterData.description,
          thumbnail: characterData.thumbnail,
          comics: characterData.comics.items,
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { character, isLoading, error };
};

export default useCharacter;
