import { MAX_CHARACTER_COMICS } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { getCharacterComicsService } from '../services';
MAX_CHARACTER_COMICS;

const useCharacterComics = (characterId: string | undefined, maxComics: number, page: number) => {
  const { isError, data, isFetching, refetch } = useQuery(
    ['characterComics', characterId],
    () => getCharacterComicsService({ characterId, maxComics, page }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  const safeOffset = data ? data.offset : 0;
  const comics = data?.response?.results;

  return {
    comics,
    totalComics: data?.response.total,
    rangeInit: safeOffset + 1,
    rangeEnd: safeOffset + comics?.length,
    isErrorOnComics: isError,
    isFetchingComics: isFetching,
    refetch,
  };
};

export default useCharacterComics;
