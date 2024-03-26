import mockCharacterDetail from '../mocks/mockCharacterDetail.json';
import mockCharacterComics from '../mocks/mockCharacterComics.json';
import { RenderOptions, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterDetail from '../CharacterDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacterDetails, useCharacterComics } from '../hooks';
import userEvent from '@testing-library/user-event';

jest.mock('../hooks');

const queryClient = new QueryClient();

jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: () => null,
}));

jest.mock('../../../molecules/SelectGroup', () => {
  return {
    EmotionCacheProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

const mockUseCharacterDetails = useCharacterDetails as jest.Mock;

const mockUseCharacterComics = useCharacterComics as jest.Mock;

const renderSnapshot = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, options);
};

it('renders the character detail page and matches snapshot', () => {
  // ARRANGE
  mockUseCharacterDetails.mockReturnValue({
    isLoadingCharacter: false,
    isErrorOnCharacter: false,
    character: mockCharacterDetail,
  });

  mockUseCharacterComics.mockReturnValue({
    comics: mockCharacterComics,
    totalComics: 0,
    rangeInit: 0,
    rangeEnd: 0,
    isErrorOnComics: false,
    isFetchingComics: false,
    isFirstPage: true,
    isLastPage: true,
    refetch: jest.fn(),
  });

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

  mockUseCharacterComics.mockReturnValue({
    comics: [],
    totalComics: 0,
    rangeInit: 0,
    rangeEnd: 0,
    isErrorOnComics: false,
    isFetchingComics: false,
    isFirstPage: true,
    isLastPage: true,
    refetch: jest.fn(),
  });

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
  mockUseCharacterDetails.mockReturnValue({
    isLoadingCharacter: false,
    isErrorOnCharacter: false,
    character: mockCharacterDetail,
  });

  mockUseCharacterComics.mockReturnValue({
    comics: mockCharacterComics,
    totalComics: 0,
    rangeInit: 0,
    rangeEnd: 0,
    isErrorOnComics: false,
    isFetchingComics: false,
    isFirstPage: true,
    isLastPage: true,
    refetch: jest.fn(),
  });

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
  mockUseCharacterDetails.mockReturnValue({
    isLoadingCharacter: false,
    isErrorOnCharacter: false,
    character: mockCharacterDetail,
  });

  mockUseCharacterComics.mockReturnValue({
    comics: mockCharacterComics,
    totalComics: 0,
    rangeInit: 0,
    rangeEnd: 0,
    isErrorOnComics: false,
    isFetchingComics: false,
    isFirstPage: true,
    isLastPage: true,
    refetch: jest.fn(),
  });

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

it('renders an order selector for the comics list when the character has some', () => {
  // ARRANGE
  mockUseCharacterDetails.mockReturnValue({
    isLoadingCharacter: false,
    isErrorOnCharacter: false,
    character: mockCharacterDetail,
  });

  mockUseCharacterComics.mockReturnValue({
    comics: mockCharacterComics,
    totalComics: 0,
    rangeInit: 0,
    rangeEnd: 0,
    isErrorOnComics: false,
    isFetchingComics: false,
    isFirstPage: true,
    isLastPage: true,
    refetch: jest.fn(),
  });

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharacterDetail />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('combobox', { name: /order comics/i })).toBeInTheDocument();
});

it('render the comics list order selector with the required options', () => {
  // ARRANGE
  mockUseCharacterDetails.mockReturnValue({
    isLoadingCharacter: false,
    isErrorOnCharacter: false,
    character: mockCharacterDetail,
  });

  mockUseCharacterComics.mockReturnValue({
    comics: mockCharacterComics,
    totalComics: 0,
    rangeInit: 0,
    rangeEnd: 0,
    isErrorOnComics: false,
    isFetchingComics: false,
    isFirstPage: true,
    isLastPage: true,
    refetch: jest.fn(),
  });

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharacterDetail />
      </Router>
    </QueryClientProvider>,
  );

  const selectOptionTitleAZ = screen.getByRole('option', {
    name: /title \(a\/z\)/i,
  }) as HTMLOptionElement;
  const selectOptionTitleZA = screen.getByRole('option', {
    name: /title \(z\/a\)/i,
  }) as HTMLOptionElement;
  const selectOptionFirstLast = screen.getByRole('option', {
    name: /(first\/last)+/i,
  }) as HTMLOptionElement;
  const selectOptionLastFirst = screen.getByRole('option', {
    name: /(last\/first)+/i,
  }) as HTMLOptionElement;

  // ASSERT
  expect(selectOptionTitleAZ.value).toBe('title');
  expect(selectOptionTitleZA.value).toBe('-title');
  expect(selectOptionFirstLast.value).toBe('issueNumber');
  expect(selectOptionLastFirst.value).toBe('-issueNumber');
});

it('fetches a comic list when order is changed', async () => {
  // ARRANGE
  const user = userEvent.setup();

  mockUseCharacterDetails.mockReturnValue({
    isLoadingCharacter: false,
    isErrorOnCharacter: false,
    character: mockCharacterDetail,
  });

  mockUseCharacterComics.mockReturnValue({
    comics: mockCharacterComics,
    totalComics: 0,
    rangeInit: 0,
    rangeEnd: 0,
    isErrorOnComics: false,
    isFetchingComics: false,
    isFirstPage: true,
    isLastPage: true,
    refetch: jest.fn(),
  });

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CharacterDetail />
      </Router>
    </QueryClientProvider>,
  );

  // reordering not happening because items are mocked
  user.selectOptions(screen.getByRole('combobox', { name: /order comics/i }), '-title');

  // ASSERT
  await waitFor(() => {
    expect(mockUseCharacterComics).toHaveBeenCalledTimes(3);
    expect(screen.getByRole('list', { name: /list of comics/i })).toBeInTheDocument();
  });
});
