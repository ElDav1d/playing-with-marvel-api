import { useState, useEffect } from 'react';
import { CharacterDetail } from '@/interfaces/globals';
import { BASE_URL } from '@/utils/constants';

export interface ComicItem {
  resourceUri: string;
  name: string;
}
export interface UseCharacterDetailResponse {
  characterData: CharacterDetail;
  isLoading: boolean;
  error: unknown;
}

const useCharacterDetail = (id: string | undefined): UseCharacterDetailResponse => {
  const initCharacter = {
    name: '',
    description: '',
    thumbnail: { path: '', extension: '' },
    comics: [],
  };

  const [characterData, setCharacter] = useState<CharacterDetail>(initCharacter);
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
        const {
          name,
          description,
          thumbnail,
          comics: { items: comics },
        } = data.data.results[0];

        setCharacter({
          name,
          description,
          thumbnail,
          comics,
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
  return { characterData, isLoading, error };
};

export default useCharacterDetail;
