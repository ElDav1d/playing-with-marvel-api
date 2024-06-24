import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import CharactersHeroSection from '../CharactersHeroSection';
import { CharactersProvider } from '@/components/pages/Characters/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setUpMatchMedia } from '@/utils/testHelpers';
import { act } from 'react-dom/test-utils';
import { DEBOUNCE_DELAY } from '@/utils/constants';

const queryClient = new QueryClient();

it('renders a title', () => {
  // ARRANGE
  setUpMatchMedia(true);

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersHeroSection />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const title = screen.getByRole('heading', { level: 2, name: /characters/i });

  // ASSERT
  expect(title).toBeInTheDocument();
});

it('renders a control panel form when desktop', () => {
  // ARRANGE
  setUpMatchMedia(true);

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersHeroSection />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const controlPanel = screen.getByRole('form', { name: /control panel/i });

  // ASSERT
  expect(controlPanel).toBeInTheDocument();
});

it('matches desktop snapshot', () => {
  // ARRANGE
  setUpMatchMedia(true);

  // ACT
  const { asFragment } = render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersHeroSection />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(asFragment()).toMatchSnapshot();
});

it('omits the control panel form when mobile', () => {
  // ARRANGE
  setUpMatchMedia(false);

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersHeroSection />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const controlPanel = screen.queryByRole('form', { name: /control panel/i });

  // ASSERT
  expect(controlPanel).not.toBeInTheDocument();
});

it('matches mobile snapshot', () => {
  // ARRANGE
  setUpMatchMedia(false);

  // ACT
  const { asFragment } = render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersHeroSection />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(asFragment()).toMatchSnapshot();
});

it('renders a search input', () => {
  // ARRANGE
  setUpMatchMedia(true);

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersHeroSection />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const searchInput = screen.getByRole('textbox', { name: /search/i });

  // ASSERT
  expect(searchInput).toBeInTheDocument();
});

it('renders a fully functional clear button when search has a value', async () => {
  // ARRANGE
  const user = userEvent.setup();

  setUpMatchMedia(true);

  jest.useFakeTimers();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersProvider>
        <CharactersHeroSection />
      </CharactersProvider>
    </QueryClientProvider>,
  );

  const searchInput = screen.getByRole('textbox', { name: /search/i });

  user.type(searchInput, 'test');

  act(() => {
    jest.advanceTimersByTime(DEBOUNCE_DELAY);
  });

  await waitFor(() => {
    const clearButton = screen.getByRole('button', { name: /clear/i });

    user.click(clearButton);
  });

  // ASSERT
  await waitFor(() => {
    expect(searchInput).toHaveValue('');
  });
});
