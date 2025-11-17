/**
 * MOCK SERVICE - Marvel API was discontinued
 * Searches for character by ID in the mock characters array
 * to maintain functional navigation between character details.
 */
import mockCharacters from '@/components/organisms/CharacterList/mocks/mockCharactersAZ.json';
import { ICharacterItem } from '@/components/pages/Characters/interfaces/characters';

const getCharacterDetailsService = async (characterId: string | undefined) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    // Search character by ID in the 100 mocks array
    const character = mockCharacters.find(
      (char: ICharacterItem) => char.id === Number(characterId)
    );

    // If doesn't exist, return first as fallback
    return character || mockCharacters[0];
  } catch (error) {
    console.log(error);
  }
};

export default getCharacterDetailsService;
