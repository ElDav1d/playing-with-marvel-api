import { render, screen, within } from '@testing-library/react';
import CharacterList from '../CharacterList';
import { CharactersProvider } from '@/components/pages/Characters/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacters, useFilteredCharacters } from '../hooks';
import mockCharactersAZ from '../mocks/mockCharactersAZ.json';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

global.IntersectionObserver = class IntersectionObserver {
  observe = () => null;
  unobserve = () => null;
  disconnect = () => null;
  root = null;
  rootMargin = '';
  thresholds = [0];
  takeRecords = () => [];
};

jest.mock('../hooks');

const mockUseCharacters = useCharacters as jest.Mock;

const mockUseFilteredCharacters = useFilteredCharacters as jest.Mock;

it('renders the loader when loading first list page', () => {
  // ARRANGE
  mockUseCharacters.mockReturnValue({
    isLoading: true,
    characters: undefined,
  });

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharacterList />
      </CharactersProvider>
    </QueryClientProvider>,
  );
  // ASSERT
  expect(screen.getByRole('alert', { name: /loading/i })).toBeInTheDocument();
});

it('renders the loader when loading next list page', () => {
  // ARRANGE
  mockUseCharacters.mockReturnValue({
    hasNextPage: true,
    characters: undefined,
  });

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharacterList />
      </CharactersProvider>
    </QueryClientProvider>,
  );
  // ASSERT
  expect(screen.getByRole('alert', { name: /loading/i })).toBeInTheDocument();
});

it('informs user from error', () => {
  // ARRANGE
  mockUseCharacters.mockReturnValue({
    isError: true,
    characters: undefined,
  });

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharacterList />
      </CharactersProvider>
    </QueryClientProvider>,
  );
  // ASSERT
  expect(screen.getByRole('heading', { level: 2, name: /error/i })).toBeInTheDocument();
});

it('informs user from empty results', () => {
  // ARRANGE
  mockUseCharacters.mockReturnValue({
    isError: false,
    isLoading: false,
  });

  mockUseFilteredCharacters.mockReturnValue([]);

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharacterList />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('heading', { level: 3, name: /characters/i })).toBeInTheDocument();
});

it('renders a list of characters with list items', () => {
  // ARRANGE
  mockUseCharacters.mockReturnValue({
    isError: false,
    isLoading: false,
  });

  mockUseFilteredCharacters.mockReturnValue(JSON.parse(JSON.stringify(mockCharactersAZ)));

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharactersProvider>
          <CharacterList />
        </CharactersProvider>
      </Router>
    </QueryClientProvider>,
  );

  const charactersList = screen.getByRole('list', { name: /characters list/i });
  const listTargetOne = within(charactersList).getByRole('listitem', { name: /animal/i });
  const listTargetTwo = within(charactersList).getByRole('listitem', { name: /braineater/i });

  // ASSERT
  expect(listTargetOne).toBeInTheDocument();
  expect(listTargetTwo).toBeInTheDocument();
});

it('renders the list of characters and matches  snapshot', () => {
  // ARRANGE
  mockUseCharacters.mockReturnValue({
    isError: false,
    isLoading: false,
  });

  mockUseFilteredCharacters.mockReturnValue(JSON.parse(JSON.stringify(mockCharactersAZ)));

  // ACT
  const { asFragment } = render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharactersProvider>
          <CharacterList />
        </CharactersProvider>
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(asFragment()).toMatchSnapshot();
});
