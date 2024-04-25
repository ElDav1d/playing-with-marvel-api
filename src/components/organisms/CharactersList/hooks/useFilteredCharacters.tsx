import { useMemo } from 'react';
import {
  ICharacterItem,
  FilterCriteria,
} from '@/components/pages/Characters/interfaces/characters';

const useFilteredCharacters = (
  characters: ICharacterItem[],
  filtersContextState: Record<FilterCriteria, boolean>,
) => {
  return useMemo(() => {
    const hasImage = (path: string) => !path.includes('image_not_available');
    const hasDescription = (description: string) => description && description !== ' ';

    let filterCallback;

    switch (true) {
      case filtersContextState[FilterCriteria.IMAGE] &&
        filtersContextState[FilterCriteria.DESCRIPTION]:
        filterCallback = (character: ICharacterItem) =>
          hasImage(character.thumbnail.path) && hasDescription(character.description);
        break;

      case filtersContextState[FilterCriteria.IMAGE]:
        filterCallback = (character: ICharacterItem) => hasImage(character.thumbnail.path);
        break;

      case filtersContextState[FilterCriteria.DESCRIPTION]:
        filterCallback = (character: ICharacterItem) => hasDescription(character.description);
        break;

      default:
        return characters;
    }

    return characters.filter(filterCallback);
  }, [characters, filtersContextState]);
};

export default useFilteredCharacters;
