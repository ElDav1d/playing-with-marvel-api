import getCharactersService from '../services/getCharactersService';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useCharacters = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['characters'],
    getCharactersService,
    {
      refetchOnWindowFocus: false,
    },
  );

  return {
    isLoading,
    isError,
    characters: data?.pages.flatMap((page) => page) ?? [],
    refetch,
  };
};

export default useCharacters;
