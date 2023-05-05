/* eslint-disable @typescript-eslint/no-empty-function */
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import mockCharactersAZ from '../mocks/mockCharactersAZ.json';
import { useCharacters } from '../hooks';
import Characters from '../Characters';

jest.mock('../hooks');

const mockIntersectionObserver = jest.fn();

mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = mockIntersectionObserver;

describe(Characters, () => {
  it('renders a page of characters', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    const queryClient = new QueryClient();

    const mockUseCharacters = useCharacters as jest.Mock;

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
    expect(screen.getByRole('heading', { name: /Braineater/i })).toBeInTheDocument();
  });
});
