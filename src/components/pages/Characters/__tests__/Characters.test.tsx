/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';
import CharactersContext from '@/components/pages/Characters/context';
import Characters from '../Characters';
import { mockCharactersAZ } from '../mockCharacters';

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

  jest.mock('../../../../services/useCharacters', () => ({
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
      <CharactersContext.Provider value={value}>
        <Characters />
      </CharactersContext.Provider>,
    );

    // ASSERT
    expect(
      screen.getByRole('heading', { name: /this is the characters page/i }),
    ).toBeInTheDocument();
  });
});
