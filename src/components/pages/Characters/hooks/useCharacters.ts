import getCharactersService from '../services/getCharactersService';
import {
  FetchNextPageOptions,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { CharacterItem, FetchingOrder } from '../interfaces/characters';

/**
 * Props for the useCharacters custom hook.
 * @interface
 */
export interface IUseCharactersProps {
  /**
   * The maximum number of characters to fetch.
   * @property {number}
   */
  maxCharacters: number;
  /**
   * The search string to filter characters.
   * @property {string}
   */
  searchString: string;
  /**
   * The fetching order for the characters.
   * @property {FetchingOrder}
   */
  order: FetchingOrder;
  /**
   * Indicates whether to clear data.
   * @property {boolean}
   */
  onClearData: boolean;
}

/**
 * Return type for the useCharacters custom hook.
 * @interface
 */
export interface UseCharactersReturn {
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
   * @property {CharacterItem[]}
   */
  characters: CharacterItem[];
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
 * @param {IUseCharactersProps} props - The hook props.
 * @returns {UseCharactersReturn} The hook return values.
 */
export const useCharacters = ({
  maxCharacters,
  searchString,
  order,
  onClearData,
}: IUseCharactersProps): UseCharactersReturn => {
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
