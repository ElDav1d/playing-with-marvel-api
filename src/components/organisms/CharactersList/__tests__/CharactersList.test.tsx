import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharactersList from '../CharactersList';
import { mockCharacters } from '@/components/pages/Characters/mockCharacters';

describe(CharactersList, () => {
  it('renders a list of characters', () => {
    const filters = [''];

    render(
      <Router>
        <CharactersList filters={filters} characters={mockCharacters} />
      </Router>,
    );

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(4);
  });

  it('renders a filtered list of characters with description', () => {
    const filters = ['withDescription'];

    render(
      <Router>
        <CharactersList filters={filters} characters={mockCharacters} />
      </Router>,
    );

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders a filtered list of characters with image', () => {
    const filters = ['withImage'];

    render(
      <Router>
        <CharactersList filters={filters} characters={mockCharacters} />
      </Router>,
    );

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
  });

  it('renders a filtered list of characters with description and image', () => {
    const filters = ['withDescription', 'withImage'];

    render(
      <Router>
        <CharactersList filters={filters} characters={mockCharacters} />
      </Router>,
    );

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(1);
  });
});
