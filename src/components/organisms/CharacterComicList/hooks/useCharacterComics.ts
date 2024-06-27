import { MAX_FETCH_CHARACTER_COMICS } from '@/utils/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCharacterComicsService } from '../services';
import { FetchingOrder, ICharacterComicDetails } from '../interfaces/characterComics';

/**
 * Props for the useCharacterComics custom hook.
 * @interface
 */
export interface IUseCharacterComicsProps {
  /**
   * The character ID.
   * @type {string}
   * @default undefined
   */
  characterId: string | undefined;
  /**
   * The maximum number of comics to fetch.
   * @type {number}
   */
  maxComics: number;
  /**
   * The page number.
   * @type {number}
   */
  page: number;
  /**
   * Whether to clear the data.
   * @type {boolean}
   * @default false
   */
  onClearData: boolean;
  /**
   * The fetching order for the comics.
   * @type {FetchingOrder}
   */
  order: FetchingOrder;
}

/**
 * Return type for the useCharacterComics custom hook.
 * @interface
 */
export interface IUseCharacterComicsReturn {
  /**
   * An array of character comics.
   * @property {ICharacterComicDetails[] | undefined}
   */
  comics: ICharacterComicDetails[] | undefined;
  /**
   * The total number of available comics.
   * @property {number | undefined}
   */
  totalComics: number | undefined;
  /**
   * The initial range number.
   * to be fetched.
   * @property {number}
   */
  rangeInit: number;
  /**
   * The end range number.
   * to be fetched.
   * @property {number | undefined}
   */
  rangeEnd: number | undefined;
  /**
   * Indicates if there is an error.
   * @property {boolean}
   */
  isErrorOnComics: boolean;
  /**
   * Indicates if data is being fetched.
   * @property {boolean}
   */
  isFetchingComics: boolean;
  /**
   * Indicates if it is the last page.
   * @property {boolean}
   */
  isLastPage: boolean;
  /**
   * Indicates if it is the first page.
   * @property {boolean}
   */
  isFirstPage: boolean;

  refetch: () => void;
}

/**
 * Custom hook for fetching character comics.
 * @param {IUseCharacterComicsProps} props - The hook props.
 * @returns {IUseCharacterComicsReturn} The hook return object.
 */
const useCharacterComics = ({
  characterId,
  maxComics,
  page,
  order,
  onClearData,
}: IUseCharacterComicsProps): IUseCharacterComicsReturn => {
  const { isError, data, isFetching, refetch } = useQuery({
    queryKey: ['characterComics', characterId],
    queryFn: () => getCharacterComicsService({ characterId, maxComics, page, order }),
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
