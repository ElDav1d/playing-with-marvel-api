import getCharactersService from '../services/getCharactersService';
import { useQuery } from '@tanstack/react-query';

export const useCharacters = () => {
  const { isLoading, isError, data, refetch } = useQuery(['characters'], getCharactersService, {
    refetchOnWindowFocus: false,
  });

  return { isLoading, isError, characters: data, refetch };
};
