import { MAX_CHARACTER_COMICS } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { getCharacterComicsService } from '../services';

const useCharacterComics = (characterId: string | undefined, maxComics: number, page: number) => {
  const { isError, data, isFetching, isPreviousData, refetch } = useQuery(
    ['characterComics', characterId],
    () => getCharacterComicsService({ characterId, maxComics, page }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 5000,
    },
  );

  const safeOffset = data ? data.offset : 0;
  const comics = data?.apiData.results;
  const totalComics = data?.apiData.total;

  return {
    comics,
    totalComics,
    rangeInit: safeOffset + 1,
    rangeEnd: safeOffset + comics?.length,
    isErrorOnComics: isError,
    isFetchingComics: isFetching,
    isLastPage: safeOffset + MAX_CHARACTER_COMICS >= totalComics,
    isFirstPage: safeOffset === 0,
    isPreviousData,
    refetch,
  };
};

export default useCharacterComics;
