import { render, screen } from '@testing-library/react';
import Characters from '../Characters';
import { mockCharacters } from '../mockCharacters';

describe(Characters, () => {
  jest.mock('../../../../services/useCharacters', () => ({
    useCharacters: () => mockCharacters,
  }));
  it('renders a list of characters', () => {
    render(<Characters />);
    expect(screen.getByRole('heading', { name: /this is the characters page/i })).toBeInTheDocument();
  });
});
