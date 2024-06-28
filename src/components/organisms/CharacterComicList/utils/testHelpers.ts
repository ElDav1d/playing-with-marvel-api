import mockCharacterComics from '../mocks/mockCharacterComics.json';
import userEvent from '@testing-library/user-event';
import { useCharacterComics } from '../hooks';

const mockUseCharacterComics = useCharacterComics as jest.Mock;

export const setUpCharacterComics = () => {
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
};

export const setUpHappyPathWithUser = () => {
  setUpCharacterComics();
  return { user: userEvent.setup() };
};
