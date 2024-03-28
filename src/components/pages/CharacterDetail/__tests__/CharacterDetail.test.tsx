import { RenderOptions, render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterDetail from '../CharacterDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacterDetails, useCharacterComics } from '../hooks';
import { setUpCharacterComics, setUpHappyPath, setUpHappyPathWithUser } from '../utils/testHelpers';

jest.mock('../hooks');

const queryClient = new QueryClient();

jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: () => null,
}));

const mockUseCharacterDetails = useCharacterDetails as jest.Mock;

const mockUseCharacterComics = useCharacterComics as jest.Mock;

document.title = 'Test Title';

it('renders the character detail page and matches snapshot', () => {
  // ARRANGE
  setUpHappyPath();

  const renderSnapshot = (ui: React.ReactElement, options?: RenderOptions) => {
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, options);
  };

  // ACT
  const { asFragment } = renderSnapshot(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharacterDetail />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(asFragment()).toMatchSnapshot();
});

it('renders the loader when fetching initial page', () => {
  // ARRANGE
  mockUseCharacterDetails.mockReturnValue({
    isLoadingCharacter: true,
    isErrorOnCharacter: false,
    character: undefined,
  });

  setUpCharacterComics();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharacterDetail />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('alert', { name: /(loading)/i })).toBeInTheDocument();
});

it('renders the character detail page with appropiate elements', () => {
  // ARRANGE
  setUpHappyPath();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharacterDetail />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('banner', { name: /common header/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /playing with marvel api/i })).toBeInTheDocument();
  expect(screen.getByRole('main', { name: /character detail main content/i })).toBeInTheDocument();
  expect(screen.getByRole('article', { name: /character detail article/i })).toBeInTheDocument();
  expect(screen.getByRole('contentinfo', { name: /common footer/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /abomination/i })).toBeInTheDocument();
});

it('renders a list of comics when the character has some', () => {
  // ARRANGE
  setUpHappyPath();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharacterDetail />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('list', { name: /list of comics/i })).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(10);
});

it('renders an order select group for the comics list when the character has some', () => {
  // ARRANGE
  setUpHappyPath();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharacterDetail />
      </Router>
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
      <Router>
        <CharacterDetail />
      </Router>
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
      <Router>
        <CharacterDetail />
      </Router>
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
