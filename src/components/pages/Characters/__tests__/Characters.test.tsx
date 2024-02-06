/* eslint-disable @typescript-eslint/no-empty-function */
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import mockCharactersAZ from '../mocks/mockCharactersAZ.json';
import { useCharacters } from '../hooks';
import Characters from '../Characters';
import userEvent from '@testing-library/user-event';

jest.mock('../hooks');

const mockUseCharacters = useCharacters as jest.Mock;

const mockIntersectionObserver = jest.fn();

mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = mockIntersectionObserver;

const queryClient = new QueryClient();

describe.skip(Characters, () => {
  it.skip('renders a page of characters', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
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
    expect(
      screen.getByRole('heading', { name: /this is the characters page/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
  });

  it.skip('renders a list with characters', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

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

  it.skip('renders a list with characters as list items', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

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

  it.skip('renders a search by name input group', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

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

  it.skip('fetches a new list of characters after typing on search by name input', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    const DEFAULT_FETCH_CALLS = 2;

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const searchInputElement = screen.getByPlaceholderText(/name/i);

    act(() => {
      userEvent.type(searchInputElement, 'X');
    });

    // ASSERT
    expect(mockUseCharacters).toBeCalledTimes(DEFAULT_FETCH_CALLS + 1);
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
  });

  it.skip('renders an order select input group with its required options', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const selectInputGroup = screen.getByRole('group', { name: /order/i });
    const selecOptionNameAZ = screen.getByRole('option', { name: /(a\/z)+/i }) as HTMLOptionElement;
    const selecOptionNameZA = screen.getByRole('option', { name: /(z\/a)+/i }) as HTMLOptionElement;
    const selecOptionModifiedFirstLast = screen.getByRole('option', {
      name: /(first\/last)+/i,
    }) as HTMLOptionElement;
    const selecOptionModifiedLastFirst = screen.getByRole('option', {
      name: /(last\/first)+/i,
    }) as HTMLOptionElement;

    // ASSERT
    expect(selectInputGroup).toBeInTheDocument();
    expect(selecOptionNameAZ.value).toBe('name');
    expect(selecOptionNameZA.value).toBe('-name');
    expect(selecOptionModifiedFirstLast.value).toBe('modified');
    expect(selecOptionModifiedLastFirst.value).toBe('-modified');
  });

  it.skip('fetches a new list of characters after selecting an order option', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    const DEFAULT_FETCH_CALLS = 2;

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    act(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), '-name');
    });

    // ASSERT
    expect(mockUseCharacters).toBeCalledTimes(DEFAULT_FETCH_CALLS * 2);
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
  });

  it('renders an filter input group with its required checkboxes', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    // screen.getByRole('');
    const checkInputGroup = screen.getByRole('group', { name: /filter/i });
    const checkWithImage = screen.getByRole('checkbox', { name: /(image)+/i });
    const checkWithDescription = screen.getByRole('checkbox', { name: /(description)+/i });

    // ASSERT
    expect(checkInputGroup).toBeInTheDocument();
    expect(checkWithImage).toBeInTheDocument();
    expect(checkWithDescription).toBeInTheDocument();
  });

  it('renders a characters with image list when the image filter is checked', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const checkWithImage = screen.getByRole('checkbox', { name: /(image)+/i });

    act(() => {
      userEvent.click(checkWithImage);
    });

    // ASSERT
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /crusher/i })).toBeInTheDocument();
  });

  it.skip('renders a characters with description list when the description filter is checked', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const checkWithDescription = screen.getByRole('checkbox', { name: /(description)+/i });

    act(() => {
      userEvent.click(checkWithDescription);
    });

    // ASSERT
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
  });

  it.skip('keeps rendering a filtered characters list after selecting an order option', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const checkWithImage = screen.getByRole('checkbox', { name: /(image)+/i });

    act(() => {
      userEvent.click(checkWithImage);

      userEvent.selectOptions(screen.getByRole('combobox'), '-name');
    });

    // ASSERT
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /crusher/i })).toBeInTheDocument();
  });

  it.skip('renders the complete characters list after unchecking a filter', () => {
    // ARRANGE
    const charactersAZ = JSON.parse(JSON.stringify(mockCharactersAZ));

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      isError: false,
      characters: charactersAZ,
    });

    // ACT
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Characters />
        </Router>
      </QueryClientProvider>,
    );

    const checkWithImage = screen.getByRole('checkbox', { name: /(image)+/i });

    act(() => {
      userEvent.click(checkWithImage);
      userEvent.click(checkWithImage);
    });

    // ASSERT
    expect(screen.getByRole('heading', { name: /animal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /braineater/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /crusher/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /destructor/i })).toBeInTheDocument();
  });
});
