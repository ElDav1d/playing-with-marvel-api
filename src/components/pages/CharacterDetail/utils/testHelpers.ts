import mockCharacterDetail from '../mocks/mockCharacterDetail.json';
import mockCharacterComics from '../mocks/mockCharacterComics.json';
import { useCharacterDetails } from '../hooks';
import userEvent from '@testing-library/user-event';
import { useCharacterComics } from '@/components/organisms/CharacterComicList/hooks';

const mockUseCharacterDetails = useCharacterDetails as jest.Mock;

const mockUseCharacterComics = useCharacterComics as jest.Mock;

export const setUpCharacterDetails = () => {
  mockUseCharacterDetails.mockReturnValue({
    isLoadingCharacter: false,
    isErrorOnCharacter: false,
    character: mockCharacterDetail,
  });
};

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

export const setUpHappyPath = () => {
  setUpCharacterDetails();
  setUpCharacterComics();
};

export const setUpHappyPathWithUser = () => {
  setUpHappyPath();
  return { user: userEvent.setup() };
};
