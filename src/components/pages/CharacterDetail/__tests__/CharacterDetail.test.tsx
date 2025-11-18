import { RenderOptions, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterDetail from '../CharacterDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacterDetails } from '../hooks';
import { setUpCharacterDetails } from '../../utils/testHelpers';
import { useCharacterComics } from '@/components/organisms/CharacterComicList/hooks';
import mockComics from '@/components/organisms/CharacterComicList/mocks/mockCharacterComics.json';

jest.mock('../hooks');
jest.mock('@/components/organisms/CharacterComicList/hooks');

const queryClient = new QueryClient();

const mockUseCharacterDetails = useCharacterDetails as jest.Mock;
const mockUseCharacterComics = useCharacterComics as jest.Mock;

// Default mock for useCharacterComics (loading state)
beforeEach(() => {
  mockUseCharacterComics.mockReturnValue({
    comics: undefined,
    totalComics: undefined,
    rangeInit: 0,
    rangeEnd: 0,
    isError: false,
    isFetching: false,
    isLoading: true,
    isLastPage: false,
    isFirstPage: true,
    refetch: jest.fn(),
  });
});

it('renders the character detail page and matches snapshot', () => {
  // ARRANGE
  setUpCharacterDetails();

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
    isLoading: true,
    isError: false,
    character: undefined,
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
  setUpCharacterDetails();

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

it('renders disclaimer about generic comics and reused images', () => {
  // ARRANGE
  setUpCharacterDetails();
  mockUseCharacterComics.mockReturnValue({
    comics: mockComics.slice(0, 10),
    totalComics: 30,
    rangeInit: 1,
    rangeEnd: 10,
    isError: false,
    isFetching: false,
    isLoading: false,
    isLastPage: false,
    isFirstPage: true,
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
  const disclaimer = screen.getByText(
    /Due to Marvel API discontinuation, comics are generic and images are reused from characters/i,
  );
  expect(disclaimer).toBeInTheDocument();
});
