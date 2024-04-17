import { useMemo } from 'react';
import {
  ICharacterItem,
  FilterCriteria,
} from '@/components/pages/Characters/interfaces/characters';
import { REGEX_IMAGE_PATH } from '@/utils/constants';

const useFilteredCharacters = (
  characters: ICharacterItem[],
  filtersContextState: Record<FilterCriteria, boolean>,
) => {
  return useMemo(() => {
    const hasImage = (path: string) => !REGEX_IMAGE_PATH.test(path);
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
