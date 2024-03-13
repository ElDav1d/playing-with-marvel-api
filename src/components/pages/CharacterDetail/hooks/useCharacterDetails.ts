import { useQuery } from '@tanstack/react-query';
import { getCharacterDetailsService } from '../services';
import CharacterDetail from '../CharacterDetail';

/**
 * Props for the useCharacterDetails custom hook.
 * @interface
 */
export interface IUseCharacterDetailsProps {
  /**
   * The character ID.
   * @type {string}
   * @default undefined
   */
  characterId: string | undefined;
}
/**
 * Return type for the useCharacterDetails custom hook.
 * @interface
 */
export interface IUseCharacterDetailsReturn {
  /**
   * Indicates if the character is loading.
   * @property {boolean}
   */
  isLoadingCharacter: boolean;
  /**
   * Indicates if there is an error on the character.
   * @property {boolean}
   */
  isErrorOnCharacter: boolean;
  /**
   * The character details.
   * @property {CharacterDetails | undefined}
   */
  character: typeof CharacterDetail | undefined;
}

/**
 * Custom hook to fetch character details.
 * @function
 * @param {IUseCharacterDetailsProps} props - The props for the hook.
 * @returns {IUseCharacterDetailsReturn}
 */
const useCharacterDetails = ({
  characterId,
}: IUseCharacterDetailsProps): IUseCharacterDetailsReturn => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['characterDetails', characterId],
    queryFn: () => getCharacterDetailsService(characterId),
    refetchOnWindowFocus: false,
  });

  return {
    isLoadingCharacter: isLoading,
    isErrorOnCharacter: isError,
    character: data,
  };
};

export default useCharacterDetails;
