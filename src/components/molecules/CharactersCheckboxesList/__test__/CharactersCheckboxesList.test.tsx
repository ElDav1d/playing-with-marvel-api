import { render, screen } from '@testing-library/react';
import CharactersCheckboxesList from '../CharactersCheckboxesList';
import { FilterCriteria } from '@/components/pages/Characters/interfaces/characters';

it('has a titled group', () => {
  // ARRANGE
  render(<CharactersCheckboxesList />);

  // ASSERT
  const titledGroup = screen.getByRole('group', { name: /title/i });
  expect(titledGroup).toBeInTheDocument();
});

it('renders the options as checkboxes', () => {
  // ARRANGE
  const options = Object.values(FilterCriteria);

  render(<CharactersCheckboxesList />);

  // ASSERT
  options.forEach((option: string) => {
    expect(screen.getByRole('checkbox', { name: option })).toBeInTheDocument();
  });
});
