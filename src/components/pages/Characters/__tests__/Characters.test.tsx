/* eslint-disable @typescript-eslint/no-empty-function */
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import mockCharactersAZ from '../mocks/mockCharactersAZ.json';
import { useCharacters } from '../hooks';
import Characters from '../Characters';
import userEvent from '@testing-library/user-event';

jest.mock('../hooks');

const mockUseCharacters = useCharacters as jest.Mock;

const mockIntersectionObserver = jest.fn();

mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = mockIntersectionObserver;

const queryClient = new QueryClient();

describe(Characters, () => {
  it('renders a page of characters', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    // ASSERT
    expect(
      screen.getByRole('heading', { name: /this is the characters page/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
  });

  it('renders a list with characters', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const lists = screen.getAllByRole('list');
    const listTarget = lists.find((list) => list.textContent?.match(/animal/i));

    // ASSERT
    expect(listTarget).toBeInTheDocument();
  });

  it('renders a list with characters as list items', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const listItems = screen.getAllByRole('listitem');
    const listItemTargetOne = listItems.find((item) => item.textContent?.match(/animal/i));
    const listItemTargetTwo = listItems.find((item) => item.textContent?.match(/braineater/i));

    // ASSERT
    expect(listItemTargetOne).toBeInTheDocument();
    expect(listItemTargetTwo).toBeInTheDocument();
  });

  it('renders a search by name input group', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const searchInputGroup = screen.getByRole('group', { name: /search/i });
    const searchInputElement = screen.getByPlaceholderText(/name/i);

    // ASSERT
    expect(searchInputGroup).toBeInTheDocument();
    expect(searchInputElement).toBeInTheDocument();
  });

  it('fetches a new list of characters after typing on search by name input', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    const DEFAULT_FETCH_CALLS = 2;

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const searchInputElement = screen.getByPlaceholderText(/name/i);

    act(() => {
      userEvent.type(searchInputElement, 'X');
    });

    // ASSERT
    expect(mockUseCharacters).toBeCalledTimes(DEFAULT_FETCH_CALLS + 1);
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
  });
});
