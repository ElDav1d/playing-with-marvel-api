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

    (function () {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onloadstart = () => {
        setIsLoading(true);
      };
      request.onload = () => {
        if (request.status === 200) {
					const characters = JSON.parse(request.response).data.results;
          setCharacters(characters);
        } else {
          console.log(`error ${request.status} ${request.statusText}`);
        }
        setIsLoading(false);
      };
      request.onerror = () => {
        setIsLoading(false);
        console.log(`Error:
				Check your network
				Check the provided URL: ${url}
				`);
      };
      request.send();
    })();
  }, [calls, stackOrder]);

  return { characters, isLoading };
};

export default useCharacters;
