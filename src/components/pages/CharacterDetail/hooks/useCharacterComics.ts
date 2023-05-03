import { useQuery } from '@tanstack/react-query';
import { getCharaterComicsService } from '../services';

const useCharacterComics = (characterId: string | undefined, maxComics: number, page: number) => {
  const { isLoading, isError, data, refetch } = useQuery(
    ['characterComics', characterId],
    () => getCharaterComicsService({ characterId, maxComics, page }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  return {
    isLoadingComics: isLoading,
    isErrorOnComics: isError,
    comics: data,
    refetch,
  };
};

export default useCharacterComics;
