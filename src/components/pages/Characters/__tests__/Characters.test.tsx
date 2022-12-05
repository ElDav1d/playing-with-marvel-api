import { render, screen } from '@testing-library/react';
import Characters from '../Characters';
import { mockCharactersAZ } from '../mockCharacters';

describe(Characters, () => {
  jest.mock('../../../../services/useCharacters', () => ({
    useCharacters: () => mockCharactersAZ,
  }));

  it('renders a list of characters', () => {
    // ACT
    render(<Characters />);

    // ASSERT
    expect(
      screen.getByRole('heading', { name: /this is the characters page/i }),
    ).toBeInTheDocument();
  });
});
