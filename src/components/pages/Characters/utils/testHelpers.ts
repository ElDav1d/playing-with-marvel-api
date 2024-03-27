// TODO: find a proper way for jest to ignore setup files
/* eslint-disable @typescript-eslint/no-empty-function */
import mockCharactersAZ from '../mocks/mockCharactersAZ.json';
import { useCharacters } from '../hooks';
import userEvent from '@testing-library/user-event';
import { CharacterItem } from '../interfaces/characters';

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

export const setUpHappyPath = (characters: CharacterItem[]) => {
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
