/* eslint-disable @typescript-eslint/no-empty-function */
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, within } from '@testing-library/react';
import { useCharacters } from '../hooks';
import Characters from '../Characters';
import { setUpCharacters, setUpHappyPath, setUpHappyPathWithUser } from '../utils/testHelpers';

jest.mock('../hooks');

const mockUseCharacters = useCharacters as jest.Mock;

const queryClient = new QueryClient();

jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: () => null,
}));

document.title = 'Test Title';

it('renders the page of characters and matches snapshot', () => {
  // ARRANGE
  setUpHappyPath(setUpCharacters());

  // ACT
  const { asFragment } = render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(asFragment()).toMatchSnapshot();
});

it('renders the loader when fetching initial page', () => {
  // ARRANGE
  mockUseCharacters.mockReturnValue({
    isFetching: true,
    isFetchingNextPage: false,
    isError: false,
    characters: undefined,
  });

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('alert', { name: /(loading)/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /animal/i })).toBeNull();
});

it('informs user on fetching error', () => {
  // ARRANGE
  mockUseCharacters.mockReturnValue({
    isFetching: false,
    isError: true,
    characters: [],
  });

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('heading', { name: /(error)/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /animal/i })).toBeNull();
});

it('renders the page of characters', () => {
  // ARRANGE
  setUpHappyPath(setUpCharacters());

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  // ASSERT
  expect(screen.getByRole('banner', { name: /common header/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Playing with Marvel API/i })).toBeInTheDocument();
  expect(screen.getByRole('main', { name: /characters page main content/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /marvel characters/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
});

it('renders a list with characters', () => {
  // ARRANGE
  setUpHappyPath(setUpCharacters());

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const lists = screen.getAllByRole('list');
  const listTarget = lists.find((list) => list.textContent?.match(/animal/i));

  // ASSERT
  expect(listTarget).toBeInTheDocument();
});

it('renders a list with characters as list items', () => {
  // ARRANGE
  setUpHappyPath(setUpCharacters());

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const listItems = screen.getAllByRole('listitem');
  const listItemTargetOne = listItems.find((item) => item.textContent?.match(/animal/i));
  const listItemTargetTwo = listItems.find((item) => item.textContent?.match(/braineater/i));

  // ASSERT
  expect(listItemTargetOne).toBeInTheDocument();
  expect(listItemTargetTwo).toBeInTheDocument();
});

it('renders a search by name input group', () => {
  // ARRANGE
  setUpHappyPath(setUpCharacters());

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const searchInputGroup = screen.getByRole('group', { name: /search/i });
  const searchInputElement = screen.getByPlaceholderText(/name/i);

  // ASSERT
  expect(searchInputGroup).toBeInTheDocument();
  expect(searchInputElement).toBeInTheDocument();
});

it('fetches a new list of characters after typing on search by name input', () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  const INITIAL_HOOK_CALLS = 1;

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const searchInputElement = screen.getByPlaceholderText(/name/i);

  user.type(searchInputElement, 'X');

  // ASSERT
  expect(mockUseCharacters).toHaveBeenCalledTimes(INITIAL_HOOK_CALLS + 1);
  expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
});

it('renders an order select input group with its required options', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
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

it('fetches a new list of characters after selecting an order option', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  const INITIAL_HOOK_CALLS = 1;

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
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
    expect(mockUseCharacters).toHaveBeenCalledTimes(INITIAL_HOOK_CALLS + 1);
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
  });
});

it('renders an filter input group with its required checkboxes', () => {
  // ARRANGE
  setUpHappyPath(setUpCharacters());

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
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

it('renders a characters with image list when the image filter is checked', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const checkWithImage = screen.getByRole('checkbox', { name: /(image)+/i });

  user.click(checkWithImage);

  // ASSERT
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /crusher/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /braineater/i })).toBeNull();
  });
});

it('renders a characters with description list when the description filter is checked', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const checkWithDescription = screen.getByRole('checkbox', { name: /(description)+/i });

  user.click(checkWithDescription);

  // ASSERT
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /crusher/i })).toBeNull();
  });
});

it('keeps rendering a filtered characters list after selecting an order option', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const checkWithImage = screen.getByRole('checkbox', { name: /(image)+/i });

  user.click(checkWithImage);

  const selectGroup = screen.getByRole('group', { name: /order/i });
  const selectInput = within(selectGroup).getByRole('combobox');

  user.click(selectInput);

  await waitFor(() => {
    // reordering not happening because items are mocked
    const selecOptionNameAZ = screen.getByRole('option', { name: /(a\/z)+/i });

    user.click(selecOptionNameAZ);
  });

  // ASSERT
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /crusher/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /braineater/i })).toBeNull();
  });
});

it('renders the complete characters list after unchecking a filter', async () => {
  // ARRANGE
  const { user } = setUpHappyPathWithUser();

  // ACT
  render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Characters />
      </Router>
    </QueryClientProvider>,
  );

  const checkWithImage = screen.getByRole('checkbox', { name: /(image)+/i });

  user.click(checkWithImage);

  user.click(checkWithImage);

  // ASSERT
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /crusher/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /destructor/i })).toBeInTheDocument();
  });
});
