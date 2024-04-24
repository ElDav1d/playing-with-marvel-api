import { render, screen, waitFor, within } from '@testing-library/react';
import CharactersControlPanel from '../CharactersControlPanel';
import { CharactersProvider } from '@/components/pages/Characters/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

it('renders a control panel form', () => {
  // ARRANGE
  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersControlPanel />
      </CharactersProvider>
    </QueryClientProvider>,
  );
  // ASSERT
  expect(screen.getByRole('form', { name: /control panel/i })).toBeInTheDocument();
});

it('renders a search by name input group', () => {
  // ARRANGE
  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersControlPanel />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const searchInputGroup = screen.getByRole('group', { name: /search/i });
  const searchInputElement = screen.getByPlaceholderText(/name/i);

  // ASSERT
  expect(searchInputGroup).toBeInTheDocument();
  expect(searchInputElement).toBeInTheDocument();
});

it('renders an order select input group with its required options', async () => {
  // ARRANGE
  const user = userEvent.setup();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersControlPanel />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const selectGroup = screen.getByRole('group', { name: /order/i });
  const selectInput = within(selectGroup).getByRole('combobox');

  user.click(selectInput);

  await waitFor(() => {
    const selecOptionNameAZ = screen.getByRole('option', { name: /(a\/z)+/i });
    const selecOptionNameZA = screen.getByRole('option', { name: /(z\/a)+/i });
    const selecOptionModifiedFirstLast = screen.getByRole('option', {
      name: /(first\/last)+/i,
    });
    const selecOptionModifiedLastFirst = screen.getByRole('option', {
      name: /(last\/first)+/i,
    });

    // ASSERT
    expect(selecOptionNameAZ).toBeInTheDocument();
    expect(selecOptionNameZA).toBeInTheDocument();
    expect(selecOptionModifiedFirstLast).toBeInTheDocument();
    expect(selecOptionModifiedLastFirst).toBeInTheDocument();
  });
});

it('renders an filter input group with its required checkboxes', () => {
  // ARRANGE
  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersControlPanel />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const checkInputGroup = screen.getByRole('group', { name: /filter/i });
  const checkWithImage = screen.getByRole('checkbox', { name: /(image)+/i });
  const checkWithDescription = screen.getByRole('checkbox', { name: /(description)+/i });

  // ASSERT
  expect(checkInputGroup).toBeInTheDocument();
  expect(checkWithImage).toBeInTheDocument();
  expect(checkWithDescription).toBeInTheDocument();
});
