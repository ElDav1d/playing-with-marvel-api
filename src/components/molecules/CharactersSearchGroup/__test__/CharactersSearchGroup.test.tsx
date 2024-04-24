import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharactersSearchGroup from '../CharactersSearchGroup';
import { CharactersProvider } from '@/components/pages/Characters/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharactersContext, useDebounce } from '@/components/pages/Characters/hooks';
import { useCharacters } from '@/components/organisms/CharactersList/hooks';

const queryClient = new QueryClient();

jest.mock('@/components/pages/Characters/hooks', () => ({
  useCharactersContext: jest.fn(),
  useDebounce: jest.fn(),
}));

jest.mock('@/components/organisms/CharactersList/hooks', () => ({
  useCharacters: jest.fn(),
}));

const mockUseCharactersContext = useCharactersContext as jest.Mock;
const mockUseDebounce = useDebounce as jest.Mock;
const mockUseCharacters = useCharacters as jest.Mock;

const setUpHappyPath = () => {
  mockUseCharacters.mockReturnValue({
    characters: [],
    isFetching: false,
  });

  mockUseCharactersContext.mockReturnValue({
    charactersContextState: { searchString: '' },
    charactersContextDispatch: jest.fn(),
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  mockUseDebounce.mockReturnValue(['', () => {}]);
};

it('renders without crashing', () => {
  // ARRANGE
  setUpHappyPath();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersSearchGroup />
      </CharactersProvider>
    </QueryClientProvider>,
  );
  // ASSERT
});

it('renders input field correctly', () => {
  // ARRANGE
  setUpHappyPath();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersSearchGroup />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const input = screen.getByRole('textbox', { name: /name/i });

  // ASSERT
  expect(input).toBeInTheDocument();
});

it('renders semantic elements correctly', () => {
  // ARRANGE
  setUpHappyPath();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersSearchGroup />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const fieldset = screen.getByRole('group', { name: /search/i });
  // ASSERT
  expect(fieldset).toBeInTheDocument();
});

it('triggers characters fetch on typing', async () => {
  // ARRANGE
  const user = userEvent.setup();

  const INITIAL_HOOK_CALLS = 1;

  setUpHappyPath();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersSearchGroup />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const inputElement = screen.getByRole('textbox', { name: /name/i });

  user.type(inputElement, 'X');

  await waitFor(() => {
    expect(useCharacters).toHaveBeenCalledTimes(INITIAL_HOOK_CALLS + 1);
  });
});
