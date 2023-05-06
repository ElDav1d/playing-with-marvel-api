/* eslint-disable @typescript-eslint/no-empty-function */
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import mockCharactersAZ from '../mocks/mockCharactersAZ.json';
import { useCharacters } from '../hooks';
import Characters from '../Characters';

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
});
