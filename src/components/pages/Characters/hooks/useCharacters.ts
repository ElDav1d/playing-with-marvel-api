import getCharactersService from '../services/getCharactersService';
import {
  FetchNextPageOptions,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { CharacterItem, FetchingOrder } from '../interfaces/characters';

export interface UseCharactersProps {
  maxCharacters: number;
  searchString: string;
  order: FetchingOrder;
  onClearData: boolean;
}

export interface UseCharactersReturn {
  isError: boolean;
  isLoading: boolean;
  characters: CharacterItem[];
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>;
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  isFetchingNextPage: boolean;
}

export const useCharacters = ({
  maxCharacters,
  searchString,
  order,
  onClearData,
}: UseCharactersProps): UseCharactersReturn => {
  const { isLoading, isError, data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
      ['characters'],
      ({ pageParam }) => getCharactersService({ pageParam, maxCharacters, searchString, order }),
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3,
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
    isFetching,
    isFetchingNextPage,
  };
};

export default useCharacters;
