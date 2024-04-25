import { render, screen } from '@testing-library/react';
import CharactersSelectGroup from '../CharactersSelectGroup';
import { CharactersProvider } from '@/components/pages/Characters/context';

it('renders input field correctly', () => {
  // ARRANGE
  // ACT
  render(
    <CharactersProvider>
      <CharactersSelectGroup />
    </CharactersProvider>,
  );

  // ASSERT
  expect(screen.getByRole('combobox', { name: /order/i })).toBeInTheDocument();
});

it('renders semantic elements correctly', () => {
  // ARRANGE
  // ACT
  render(
    <CharactersProvider>
      <CharactersSelectGroup />
    </CharactersProvider>,
  );

  const fieldset = screen.getByRole('group', { name: /order/i });
  // ASSERT
  expect(fieldset).toBeInTheDocument();
});
