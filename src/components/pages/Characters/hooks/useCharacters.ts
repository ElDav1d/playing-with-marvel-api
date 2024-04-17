import getCharactersService from '../services/getCharactersService';
import {
  FetchNextPageOptions,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { ICharacterItem } from '../interfaces/characters';
import { MAX_FETCH_CHARACTERS } from '@/utils/constants';
import useCharactersContext from './useCharactersContext';

/**
 * Return type for the useCharacters custom hook.
 * @interface
 */
export interface IUseCharactersReturn {
  /**
   * Indicates if there is an error.
   * @property {boolean}
   */
  isError: boolean;
  /**
   * Indicates if data is loading.
   * @property {boolean}
   */
  isLoading: boolean;
  /**
   * An array of character items.
   * @property {ICharacterItem[]}
   */
  characters: ICharacterItem[];
  /**
   * Function to fetch the next page of characters.
   * @property {(options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>}
   */
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>;
  /**
   * Indicates if there is a next page of characters.
   * @property {boolean | undefined}
   */
  hasNextPage: boolean | undefined;
  /**
   * Indicates if data is being fetched.
   * @property {boolean}
   */
  isFetching: boolean;
  /**
   * Indicates if the next page of data is being fetched.
   * @property {boolean}
   */
  isFetchingNextPage: boolean;
}

/**
 * Custom hook to fetch characters with pagination.
 * @function
 * @returns {IUseCharactersReturn} The hook return values.
 */
export const useCharacters = (): IUseCharactersReturn => {
  const { charactersContextState } = useCharactersContext();

  const { isLoading, isError, data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['characters', charactersContextState.searchString, charactersContextState.order],
      queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
        getCharactersService({
          pageParam,
          maxCharacters: MAX_FETCH_CHARACTERS,
          searchString: charactersContextState.searchString,
          order: charactersContextState.order,
        }),
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      initialPageParam: undefined,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
    });

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
