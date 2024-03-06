import { useQuery } from '@tanstack/react-query';
import { getCharacterDetailsService } from '../services';

const useCharacterDetails = (characterId: string | undefined) => {
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
