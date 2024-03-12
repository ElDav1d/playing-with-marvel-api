import mockCharacterDetail from '../mocks/mockCharacterDetail.json';
import mockCharacterComics from '../mocks/mockCharacterComics.json';
import { RenderOptions, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterDetail from '../CharacterDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacterDetails, useCharacterComics } from '../hooks';

jest.mock('../hooks');

const queryClient = new QueryClient();

jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: () => null,
}));

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
  expect(screen.getByRole('link', { name: /Playing with Marvel API/i })).toBeInTheDocument();
  expect(screen.getByRole('main', { name: /character detail main content/i })).toBeInTheDocument();
  expect(screen.getByRole('article', { name: /character detail article/i })).toBeInTheDocument();
  expect(screen.getByRole('group', { name: /Order results:/i })).toBeInTheDocument();
  expect(screen.getByRole('contentinfo', { name: /common footer/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /abomination/i })).toBeInTheDocument();
});
