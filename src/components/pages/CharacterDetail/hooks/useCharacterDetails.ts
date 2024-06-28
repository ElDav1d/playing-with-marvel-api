import { useQuery } from '@tanstack/react-query';
import { getCharacterDetailsService } from '../services';
import { ICharacterDetail } from '../interfaces/characterDetail';

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
  isLoading: boolean;
  /**
   * Indicates if there is an error on the character.
   * @property {boolean}
   */
  isError: boolean;
  /**
   * The character details.
   * @property {CharacterDetail | undefined}
   */
  character: ICharacterDetail | undefined;
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
    isLoading,
    isError,
    character: data,
  };
};

export default useCharacterDetails;
