import { render, screen } from '@testing-library/react';
import CharactersCheckboxesList from '../CharactersCheckboxesList';
import { FilterCriteria } from '@/components/pages/Characters/interfaces/characters';
import { CharactersProvider } from '@/components/pages/Characters/context';

it('has a titled group', () => {
  // ARRANGE

  // ACT
  render(
    <CharactersProvider>
      <CharactersCheckboxesList />
    </CharactersProvider>,
  );

  // ASSERT
  const titledGroup = screen.getByRole('group', { name: /filter/i });
  expect(titledGroup).toBeInTheDocument();
});

it('renders the options as checkboxes', () => {
  // ARRANGE
  const options = Object.values(FilterCriteria);

  // ACT
  render(
    <CharactersProvider>
      <CharactersCheckboxesList />
    </CharactersProvider>,
  );

  // ASSERT
  options.forEach((option: string) => {
    expect(screen.getByRole('checkbox', { name: option })).toBeInTheDocument();
  });
});
