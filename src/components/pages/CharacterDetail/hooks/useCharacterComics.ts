import { MAX_FETCH_CHARACTER_COMICS } from '@/utils/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCharacterComicsService } from '../services';

const useCharacterComics = (
  characterId: string | undefined,
  maxComics: number,
  page: number,
  onClearData: boolean,
) => {
  const { isError, data, isFetching, refetch } = useQuery({
    queryKey: ['characterComics', characterId],
    queryFn: () => getCharacterComicsService({ characterId, maxComics, page }),
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });

  const safeOffset = data ? data.offset : 0;
  const comics = data?.apiData.results;
  const totalComics = data?.apiData.total;

  const queryClient = useQueryClient();

  if (onClearData) {
    queryClient.removeQueries({ queryKey: ['characterComics'] });
  }

  return {
    comics,
    totalComics,
    rangeInit: safeOffset + 1,
    rangeEnd: safeOffset + comics?.length,
    isErrorOnComics: isError,
    isFetchingComics: isFetching,
    isLastPage: safeOffset + MAX_FETCH_CHARACTER_COMICS >= totalComics,
    isFirstPage: safeOffset === 0,
    refetch,
  };
};

export default useCharacterComics;
