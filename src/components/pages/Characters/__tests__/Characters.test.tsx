/* eslint-disable @typescript-eslint/no-empty-function */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import Characters from '../Characters';
import mockCharactersAZ from '../mocks/mockCharactersAZ.json';

describe(Characters, () => {
  // ARRANGE
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  const queryClient = new QueryClient();

  jest.mock('../hooks/useCharacters.ts', () => ({
    useCharacters: () => mockCharactersAZ,
  }));

  const value = {
    refProp: () => {},
    counter: null,
    setCounter: jest.fn(),
  };

  it('renders a list of characters', () => {
    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Characters />
      </QueryClientProvider>,
    );

    // ASSERT
    expect(
      screen.getByRole('heading', { name: /this is the characters page/i }),
    ).toBeInTheDocument();
  });
});
