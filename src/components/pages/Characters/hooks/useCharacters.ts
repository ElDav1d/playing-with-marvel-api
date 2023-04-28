import getCharactersService from '../services/getCharactersService';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FetchingOrder } from '../interfaces/characters';

export const useCharacters = (
  order: FetchingOrder,
  maxCharacters: number,
  onClearData: boolean,
) => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['characters'],
    ({ pageParam }) => getCharactersService({ pageParam, maxCharacters, order }),
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
      enabled: onClearData,
    },
  );

  const queryClient = useQueryClient();

  if (onClearData) {
    queryClient.removeQueries({ queryKey: ['characters'] });
  }

  return {
    isLoading,
    isError,
    characters: data?.pages.flatMap((page) => page?.characters) ?? [],
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  };
};

export default useCharacters;
