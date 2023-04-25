import getCharactersService from '../services/getCharactersService';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useCharacters = () => {
  const { isLoading, isError, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['characters'],
    getCharactersService,
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
  };
};

export default useCharacters;
