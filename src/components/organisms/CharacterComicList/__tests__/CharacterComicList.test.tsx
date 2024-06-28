import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterComicList from '../CharacterComicList';
import { render, screen, waitFor, within } from '@testing-library/react';
import { setUpCharacterComics, setUpHappyPathWithUser } from '../utils/testHelpers';
import { useCharacterComics } from '../hooks';

jest.mock('../hooks');

const mockUseCharacterComics = useCharacterComics as jest.Mock;

const queryClient = new QueryClient();

it('renders a list of comics when the character has some', () => {
  // ARRANGE
  setUpCharacterComics();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharacterComicList characterId='' characterName='' />
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('list', { name: /list of comics/i })).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(10);
});

it('renders an order select group for the comics list when the character has some', () => {
  // ARRANGE
  setUpCharacterComics();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharacterComicList characterId='' characterName='' />
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('group', { name: /order comics/i })).toBeInTheDocument();
});

it('render the comics list order selector with the required options', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharacterComicList characterId='' characterName='' />
    </QueryClientProvider>,
  );

  const selectGroup = screen.getByRole('group', { name: /order/i });
  const selectInput = within(selectGroup).getByRole('combobox');

  user.click(selectInput);

  await waitFor(() => {
    const selectOptionTitleAZ = screen.getByRole('option', {
      name: /title \(a\/z\)/i,
    });
    const selectOptionTitleZA = screen.getByRole('option', {
      name: /title \(z\/a\)/i,
    });
    const selectOptionFirstLast = screen.getByRole('option', {
      name: /(first\/last)+/i,
    });
    const selectOptionLastFirst = screen.getByRole('option', {
      name: /(last\/first)+/i,
    });

    // ASSERT
    expect(selectOptionTitleAZ).toBeInTheDocument();
    expect(selectOptionTitleZA).toBeInTheDocument();
    expect(selectOptionFirstLast).toBeInTheDocument();
    expect(selectOptionLastFirst).toBeInTheDocument();
  });
});

it('fetches a comic list when order is changed', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  const INITIAL_HOOK_CALLS = 1;

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharacterComicList characterId='' characterName='' />
    </QueryClientProvider>,
  );
  // reordering not happening because items are mocked
  const selectGroup = screen.getByRole('group', { name: /order/i });
  const selectInput = within(selectGroup).getByRole('combobox');

  user.click(selectInput);

  await waitFor(() => {
    const selecOptionNameAZ = screen.getByRole('option', { name: /(a\/z)+/i });
    user.click(selecOptionNameAZ);
  });

  // ASSERT
  await waitFor(() => {
    expect(mockUseCharacterComics).toHaveBeenCalledTimes(INITIAL_HOOK_CALLS + 1);
    expect(screen.getByRole('list', { name: /list of comics/i })).toBeInTheDocument();
  });
});
