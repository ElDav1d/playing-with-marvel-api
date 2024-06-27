import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CharactersProvider } from '@/components/pages/Characters/context';
import useCharacters from '../useCharacters';
import { ReactNode } from 'react';
import { FetchingOrder } from '@/components/pages/Characters/interfaces/characters';
import getCharactersService from '../../services/getCharactersService';
import { useCharactersContext } from '@/components/pages/Characters/hooks';

jest.mock('../../services/getCharactersService');

const queryClient = new QueryClient();

jest.mock('@/components/pages/Characters/hooks', () => ({
  useCharactersContext: jest.fn(),
}));

const mockUseCharactersContext = useCharactersContext as jest.Mock;

it('calls getCharactersService with searchString and order', async () => {
  // ARRANGE
  const contextValue = {
    searchString: 'spider',
    filters: {
      withImage: false,
      withDescription: false,
    },
    order: FetchingOrder.NAME_ZA,
  };

  mockUseCharactersContext.mockReturnValue({
    charactersContextState: contextValue,
    charactersContextDispatch: jest.fn(),
  });

  const serviceDefaultParams = {
    pageParam: undefined,
    maxCharacters: 50,
  };

  const serviceParams = {
    ...serviceDefaultParams,
    searchString: contextValue.searchString,
    order: contextValue.order,
  };

  // ACT
  const wrapper = ({ children }: { children?: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>{children}</CharactersProvider>
    </QueryClientProvider>
  );

  renderHook(() => useCharacters(), { wrapper });

  await waitFor(() => expect(getCharactersService).toHaveBeenCalledWith(serviceParams));

  // ASSERT
  expect(getCharactersService).toHaveBeenCalledTimes(1);
});
