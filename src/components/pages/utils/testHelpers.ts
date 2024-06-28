import mockCharacterDetail from '../CharacterDetail/mocks/mockCharacterDetail.json';
import { useCharacterDetails } from '../CharacterDetail/hooks';
import userEvent from '@testing-library/user-event';

const mockUseCharacterDetails = useCharacterDetails as jest.Mock;

export const setUpCharacterDetails = () => {
  mockUseCharacterDetails.mockReturnValue({
    isLoadingCharacter: false,
    isErrorOnCharacter: false,
    character: mockCharacterDetail,
  });
};

export const setUpHappyPathWithUser = () => {
  setUpCharacterDetails();
  return { user: userEvent.setup() };
};
