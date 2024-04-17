// TODO: find a proper way for jest to ignore setup files
/* eslint-disable @typescript-eslint/no-empty-function */
import mockCharactersAZ from '../mocks/mockCharactersAZ.json';
import { useCharacters } from '../hooks';
import userEvent from '@testing-library/user-event';
import { ICharacterItem } from '../interfaces/characters';

jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: () => null,
}));

const mockUseCharacters = useCharacters as jest.Mock;

const mockIntersectionObserver = jest.fn();

mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = mockIntersectionObserver;

export const setUpCharacters = () => JSON.parse(JSON.stringify(mockCharactersAZ));

export const setUpHappyPath = (characters: ICharacterItem[]) => {
  mockUseCharacters.mockReturnValue({
    isLoading: false,
    isError: false,
    characters,
  });
};

export const setUpHappyPathWithUser = () => {
  setUpHappyPath(setUpCharacters());
  return { user: userEvent.setup() };
};

export const setUpMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};
