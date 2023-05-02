import { useQuery } from '@tanstack/react-query';
import { getCharaterComicsService } from '../services';

const useCharacterComics = (characterId: string | undefined) => {
  const { isLoading, isError, data } = useQuery(
    ['characterComics', characterId],
    () => getCharaterComicsService(characterId),
    {
      refetchOnWindowFocus: false,
    },
  );

  console.log('hook', data);

  return {
    isLoadingComics: isLoading,
    isErrorOnComics: isError,
    comics: data,
  };
};

export default useCharacterComics;
