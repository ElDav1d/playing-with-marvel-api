import { useState, useEffect } from 'react';

const useCharacters = () =>  {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://gateway.marvel.com/v1/public/characters?apikey=d6f5c6bef1ef684786df6962910eb6ce',
        );

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
  }, []);

	return {characters, isLoading}
}

export default useCharacters;