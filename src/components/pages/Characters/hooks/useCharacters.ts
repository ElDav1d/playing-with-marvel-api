import getCharactersService from '../services/getCharactersService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FetchingOrder } from '../interfaces/characters';

export const useCharacters = (order: FetchingOrder, maxCharacters: number) => {
  const { isLoading, isError, data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
    ['characters'],
    ({ pageParam }) => getCharactersService({ pageParam, maxCharacters, order }),
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
    },
  );

  return {
    isLoading,
    isError,
    characters: data?.pages.flatMap((page) => page?.characters) ?? [],
    fetchNextPage,
    hasNextPage,
    refetch,
  };
};

export default useCharacters;
