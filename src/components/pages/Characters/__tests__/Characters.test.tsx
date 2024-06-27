/* eslint-disable @typescript-eslint/no-empty-function */
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import Characters from '../Characters';
import mockCharactersAZ from '@/components/organisms/CharacterList/mocks/mockCharactersAZ.json';
import { setUpMatchMedia } from '@/utils/testHelpers';
import userEvent from '@testing-library/user-event';
import { useCharacters, useFilteredCharacters } from '@/components/organisms/CharacterList/hooks';

jest.mock('@/components/organisms/CharacterList/hooks', () => ({
  useCharacters: jest.fn(),
  useFilteredCharacters: jest.fn(),
}));

const mockUseCharacters = useCharacters as jest.Mock;
const mockUseFilteredCharacters = useFilteredCharacters as jest.Mock;

const queryClient = new QueryClient();

const characters = JSON.parse(JSON.stringify(mockCharactersAZ));

it('renders the mobile page of characters and matches snapshot', async () => {
  // ARRANGE
  setUpMatchMedia(false);

  const user = userEvent.setup();

  mockUseCharacters.mockReturnValue({
    isLoading: false,
    isError: false,
    characters,
  });

  mockUseFilteredCharacters.mockReturnValue(characters);

  // ACT
  const { asFragment } = render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  // ASSERT
  expect(asFragment()).toMatchSnapshot();
});

it('only renders one control list form when mobile', async () => {
  // ARRANGE
  setUpMatchMedia(false);

  const user = userEvent.setup();

  mockUseCharacters.mockReturnValue({
    isLoading: false,
    isError: false,
    characters,
  });

  mockUseFilteredCharacters.mockReturnValue(characters);

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const openButton = screen.getByRole('button', { name: /open/i });

  user.click(openButton);

  // ASSERT
  await waitFor(() => {
    expect(screen.getByRole('form', { name: /mobile/i })).toBeInTheDocument();
    expect(screen.queryByRole('form', { name: /desktop/i })).not.toBeInTheDocument();
  });
});

it('renders the desktop page of characters and matches snapshot', () => {
  // ARRANGE
  setUpMatchMedia(true);

  mockUseCharacters.mockReturnValue({
    isLoading: false,
    isError: false,
    characters,
  });

  mockUseFilteredCharacters.mockReturnValue(characters);

  // ACT
  const { asFragment } = render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(asFragment()).toMatchSnapshot();
});

it('only renders one control list form when desktop', () => {
  // ARRANGE
  setUpMatchMedia(true);

  mockUseCharacters.mockReturnValue({
    isLoading: false,
    isError: false,
    characters,
  });

  mockUseFilteredCharacters.mockReturnValue(characters);

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('form', { name: /desktop/i })).toBeInTheDocument();
  expect(screen.queryByRole('form', { name: /mobile/i })).not.toBeInTheDocument();
});
