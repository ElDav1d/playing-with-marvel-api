/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharactersContext from '@/components/pages/Characters/context/context';
import CharactersList from '../CharactersList';
import mockCharactersAZ from '@/components/pages/Characters/mocks/mockCharactersAZ.json';
import mockCharactersZA from '@/components/pages/Characters/mocks/mockCharactersZA.json';

describe(CharactersList, () => {
  it('renders a list of characters', () => {
    // ARRANGE
    const filters = [''];
    const isLoading = false;
    const value = {
      refProp: () => {},
      counter: null,
      setCounter: jest.fn(),
    };

    // ACT
    render(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList isLoading={isLoading} filters={filters} characters={mockCharactersAZ} />
        </CharactersContext.Provider>
      </Router>,
    );

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });

  it('renders a filtered list of characters with description', () => {
    // ARRANGE
    const filters = ['withDescription'];
    const isLoading = false;
    const value = {
      refProp: () => {},
      counter: null,
      setCounter: jest.fn(),
    };

    // ACT
    render(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList isLoading={isLoading} filters={filters} characters={mockCharactersAZ} />
        </CharactersContext.Provider>
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders filtered list of characters with image', () => {
    // ARRANGE
    const filters = ['withImage'];
    const isLoading = false;
    const value = {
      refProp: () => {},
      counter: null,
      setCounter: jest.fn(),
    };

    // ACT
    render(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList isLoading={isLoading} filters={filters} characters={mockCharactersAZ} />
        </CharactersContext.Provider>
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders a filtered list of characters with description and image', () => {
    // ARRANGE
    const filters = ['withDescription', 'withImage'];
    const isLoading = false;
    const value = {
      refProp: () => {},
      counter: null,
      setCounter: jest.fn(),
    };

    // ACT
    render(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList isLoading={isLoading} filters={filters} characters={mockCharactersAZ} />
        </CharactersContext.Provider>
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(1);
  });

  it('renders the full list of characters after removing the filters', () => {
    // ARRANGE
    const initFilters = ['withDescription', 'withImage'];
    const isLoading = false;
    const value = {
      refProp: () => {},
      counter: null,
      setCounter: jest.fn(),
    };

    const { rerender } = render(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList
            isLoading={isLoading}
            filters={initFilters}
            characters={mockCharactersAZ}
          />
        </CharactersContext.Provider>
      </Router>,
    );

    // ACT
    const noFilters = [''];

    rerender(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList isLoading={isLoading} filters={noFilters} characters={mockCharactersAZ} />
        </CharactersContext.Provider>
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });

  it('renders a filtered list of characters with description after reordering', () => {
    // ARRANGE
    const initFilters = ['withDescription'];
    const isLoading = false;
    const value = {
      refProp: () => {},
      counter: null,
      setCounter: jest.fn(),
    };

    const { rerender } = render(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList
            isLoading={isLoading}
            filters={initFilters}
            characters={mockCharactersAZ}
          />
        </CharactersContext.Provider>
      </Router>,
    );

    // ACT
    rerender(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList
            isLoading={isLoading}
            filters={initFilters}
            characters={mockCharactersZA}
          />
        </CharactersContext.Provider>
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders a filtered list of characters with description after adding more', () => {
    // ARRANGE
    const initFilters = ['withDescription'];
    const initStack = mockCharactersAZ;
    const isLoading = false;
    const value = {
      refProp: () => {},
      counter: null,
      setCounter: jest.fn(),
    };

    const { rerender } = render(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList isLoading={isLoading} filters={initFilters} characters={initStack} />
        </CharactersContext.Provider>
      </Router>,
    );

    // ACT
    const biggerStack = [...initStack, ...mockCharactersZA];

    rerender(
      <Router>
        <CharactersContext.Provider value={value}>
          <CharactersList isLoading={isLoading} filters={initFilters} characters={biggerStack} />
        </CharactersContext.Provider>
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });
});
