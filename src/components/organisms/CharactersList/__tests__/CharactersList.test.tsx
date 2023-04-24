/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharactersList from '../CharactersList';
import mockCharactersAZ from '@/components/pages/Characters/mocks/mockCharactersAZ.json';
import mockCharactersZA from '@/components/pages/Characters/mocks/mockCharactersZA.json';

describe(CharactersList, () => {
  it('renders a list of characters', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    // ACT
    render(
      <Router>
        <CharactersList characters={charactersAZ} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });

  it('renders a filtered list of characters with description', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));
    const filters = ['withDescription'];

    // ACT
    render(
      <Router>
        <CharactersList characters={charactersAZ} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders filtered list of characters with image', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));
    const filters = ['withImage'];

    // ACT
    render(
      <Router>
        <CharactersList characters={charactersAZ} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders a filtered list of characters with description and image', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));
    const filters = ['withDescription', 'withImage'];

    // ACT
    render(
      <Router>
        <CharactersList characters={charactersAZ} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(1);
  });

  it('renders the full list of characters after removing the filters', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));
    const initFilters = ['withDescription', 'withImage'];

    const { rerender } = render(
      <Router>
        <CharactersList characters={charactersAZ} />
      </Router>,
    );

    // ACT
    const noFilters = [''];

    rerender(
      <Router>
        <CharactersList characters={charactersAZ} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });

  it('renders a filtered list of characters with description after reordering', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));
    const charactersZA = JSON.parse(JSON.stringify(mockCharactersZA));
    const initFilters = ['withDescription'];

    const { rerender } = render(
      <Router>
        <CharactersList characters={charactersAZ} />
      </Router>,
    );

    // ACT
    rerender(
      <Router>
        <CharactersList characters={charactersZA} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders a filtered list of characters with description after adding more', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));
    const charactersZA = JSON.parse(JSON.stringify(mockCharactersZA));
    const initFilters = ['withDescription'];

    const { rerender } = render(
      <Router>
        <CharactersList characters={charactersAZ} />
      </Router>,
    );

    // ACT
    const biggerStack = [...charactersAZ, ...charactersZA];

    rerender(
      <Router>
        <CharactersList characters={biggerStack} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });
});
