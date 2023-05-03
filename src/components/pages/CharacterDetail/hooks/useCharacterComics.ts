import { useQuery } from '@tanstack/react-query';
import { getCharacterComicsService } from '../services';

const useCharacterComics = (characterId: string | undefined, maxComics: number, page: number) => {
  const { isError, data, isFetching, refetch } = useQuery(
    ['characterComics', characterId],
    () => getCharacterComicsService({ characterId, maxComics, page }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  return {
    isErrorOnComics: isError,
    comics: data,
    isFetchingComics: isFetching,
    refetch,
  };
};

export default useCharacterComics;
