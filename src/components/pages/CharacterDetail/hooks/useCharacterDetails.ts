import { useQuery } from '@tanstack/react-query';
import getCharacterDetailsService from '../services/getCharacterDetailsService';

export const useCharacterDetails = (characterId: string | undefined) => {
  const { isLoading, isError, data } = useQuery(
    ['characterDetails', characterId],
    () => getCharacterDetailsService(characterId),
    {
      refetchOnWindowFocus: false,
    },
  );

  return {
    isLoading,
    isError,
    character: data,
  };
};
