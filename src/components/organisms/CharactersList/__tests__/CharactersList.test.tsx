import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharactersList from '../CharactersList';
import { mockCharactersAZ, mockCharactersZA } from '@/components/pages/Characters/mockCharacters';

describe(CharactersList, () => {
  it('renders a list of characters', () => {
    // ARRANGE
    const filters = [''];

    // ACT
    render(
      <Router>
        <CharactersList filters={filters} characters={mockCharactersAZ} />
      </Router>,
    );

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });

  it('renders a filtered list of characters with description', () => {
    // ARRANGE
    const filters = ['withDescription'];

    // ACT
    render(
      <Router>
        <CharactersList filters={filters} characters={mockCharactersAZ} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders filtered list of characters with image', () => {
    // ARRANGE
    const filters = ['withImage'];

    // ACT
    render(
      <Router>
        <CharactersList filters={filters} characters={mockCharactersAZ} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders a filtered list of characters with description and image', () => {
    // ARRANGE
    const filters = ['withDescription', 'withImage'];

    // ACT
    render(
      <Router>
        <CharactersList filters={filters} characters={mockCharactersAZ} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(1);
  });

  it('renders the full list of characters after removing the filters', () => {
    // ARRANGE
    const initFilters = ['withDescription', 'withImage'];

    const { rerender } = render(
      <Router>
        <CharactersList filters={initFilters} characters={mockCharactersAZ} />
      </Router>,
    );

    // ACT
    const noFilters = [''];
    rerender(
      <Router>
        <CharactersList filters={noFilters} characters={mockCharactersAZ} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });

  it('renders a filtered list of characters with description after reordering', () => {
    // ARRANGE
    const initFilters = ['withDescription'];

    const { rerender } = render(
      <Router>
        <CharactersList filters={initFilters} characters={mockCharactersAZ} />
      </Router>,
    );

    // ACT
    rerender(
      <Router>
        <CharactersList filters={initFilters} characters={mockCharactersZA} />
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

    const { rerender } = render(
      <Router>
        <CharactersList filters={initFilters} characters={initStack} />
      </Router>,
    );

    // ACT
    const biggerStack = [...initStack, ...mockCharactersZA];

    rerender(
      <Router>
        <CharactersList filters={initFilters} characters={biggerStack} />
      </Router>,
    );

    // ASSERT
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });
});
