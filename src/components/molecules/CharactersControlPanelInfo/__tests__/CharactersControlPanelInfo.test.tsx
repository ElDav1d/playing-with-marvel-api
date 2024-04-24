import { render, screen, waitFor } from '@testing-library/react';
import CharactersControlPanelInfo from '../CharactersControlPanelInfo';
import { CharactersProvider } from '@/components/pages/Characters/context';
import { useControlPanelInputInfo } from '../hooks';
import userEvent from '@testing-library/user-event';
import { useCharactersContext } from '@/components/pages/Characters/hooks';
import { setUpMatchMedia } from '@/utils/testHelpers';

jest.mock('@/components/pages/Characters/hooks', () => ({
  useCharactersContext: jest.fn(),
}));

jest.mock('../hooks', () => ({
  useControlPanelInputInfo: jest.fn(),
}));

const mockUseCharactersContext = useCharactersContext as jest.Mock;
const mockCharactersContextDispatch = jest.fn();
const mockUseControlPanelInputInfo = useControlPanelInputInfo as jest.Mock;

const mockInfoItems = [
  { type: 'describer', name: 'Results' },
  { type: 'info', prefix: ' for ', name: 'Spiderman' },
  { type: 'info', prefix: ' ordered ', name: 'by name (Z/A)' },
  { type: 'info', prefix: ' with ', name: 'image' },
  { type: 'info', prefix: ' and ', name: 'description' },
];

const MOCK_LITERAL = 'Results for Spiderman ordered by name (Z/A) with image and description';

const mockCharactersContextState = {
  searchString: 'Spiderman',
  order: 'NAME_ZA',
  filters: {
    withImage: true,
    withDescription: true,
  },
};

it('renders info correctly in mobile', () => {
  // ARRANGE
  setUpMatchMedia(false);

  mockUseControlPanelInputInfo.mockReturnValue(mockInfoItems);

  mockUseCharactersContext.mockReturnValue({
    charactersContextState: mockCharactersContextState,
    charactersContextDispatch: mockCharactersContextDispatch,
  });

  // ACT
  render(
    <CharactersProvider>
      <CharactersControlPanelInfo />
    </CharactersProvider>,
  );

  const infoString = screen.queryByText(MOCK_LITERAL);

  // ASSERT
  expect(infoString).toBeInTheDocument();
});

it('renders info correctly in desktop', () => {
  // ARRANGE
  setUpMatchMedia(true);

  mockUseControlPanelInputInfo.mockReturnValue(mockInfoItems);

  mockUseCharactersContext.mockReturnValue({
    charactersContextState: mockCharactersContextState,
    charactersContextDispatch: mockCharactersContextDispatch,
  });

  // ACT
  render(
    <CharactersProvider>
      <CharactersControlPanelInfo />
    </CharactersProvider>,
  );

  const infoString = screen.queryByText(MOCK_LITERAL);

  // ASSERT
  expect(infoString).not.toBeInTheDocument();
});

it('renders a clear button', () => {
  // ARRANGE
  setUpMatchMedia(false);

  mockUseControlPanelInputInfo.mockReturnValue(mockInfoItems);

  mockUseCharactersContext.mockReturnValue({
    charactersContextState: mockCharactersContextState,
    charactersContextDispatch: mockCharactersContextDispatch,
  });

  // ACT
  render(
    <CharactersProvider>
      <CharactersControlPanelInfo />
    </CharactersProvider>,
  );

  const clearButton = screen.getByRole('button', { name: /clear/i });

  // ASSERT
  expect(clearButton).toBeInTheDocument();
});

it('renders info correctly when charactersContextState is cleared', async () => {
  // ARRANGE
  const user = userEvent.setup();

  setUpMatchMedia(false);

  mockUseCharactersContext.mockReturnValue({
    charactersContextState: mockCharactersContextState,
    charactersContextDispatch: mockCharactersContextDispatch,
  });

  mockUseControlPanelInputInfo.mockReturnValue(mockInfoItems);

  // ACT
  render(
    <CharactersProvider>
      <CharactersControlPanelInfo />
    </CharactersProvider>,
  );

  const clearButton = screen.getByRole('button', { name: /clear/i });

  user.click(clearButton);

  // ASSERT
  await waitFor(() => {
    expect(mockCharactersContextDispatch).toHaveBeenCalledTimes(3);
    expect(mockCharactersContextDispatch).toHaveBeenCalledWith({ type: 'CLEAR_SEARCH' });
    expect(mockCharactersContextDispatch).toHaveBeenCalledWith({ type: 'CLEAR_FILTERS' });
    expect(mockCharactersContextDispatch).toHaveBeenCalledWith({ type: 'CLEAR_ORDER' });
  });
});
