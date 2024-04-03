import { CharacterListItem } from '@/components/molecules/CharacterListItem';
import { useFiltersContext } from '@/components/pages/Characters/hooks';
import { CharacterItem, FilterCriteria } from '@/components/pages/Characters/interfaces/characters';
import { REGEX_IMAGE_PATH } from '@/utils/constants';
import { useMemo } from 'react';

export interface CharactersListProps {
  characters: CharacterItem[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  const { filters } = useFiltersContext();

  const filteredCharacters = useMemo(() => {
    const hasImage = (path: string) => !REGEX_IMAGE_PATH.test(path);
    const hasDescription = (description: string) => description && description !== ' ';

    let filterCallback;

    switch (true) {
      case filters[FilterCriteria.IMAGE] && filters[FilterCriteria.DESCRIPTION]:
        filterCallback = (character: CharacterItem) =>
          hasImage(character.thumbnail.path) && hasDescription(character.description);
        break;

      case filters[FilterCriteria.IMAGE]:
        filterCallback = (character: CharacterItem) => hasImage(character.thumbnail.path);
        break;

      case filters[FilterCriteria.DESCRIPTION]:
        filterCallback = (character: CharacterItem) => hasDescription(character.description);
        break;

      default:
        return characters;
    }

    return characters.filter(filterCallback);
  }, [characters, filters]);

  return (
    <>
      {filteredCharacters?.length > 0 && (
        <ul
          aria-live='polite'
          className='grid gap-3 grid-flow-row grid-cols-auto-min-max-120-auto md:grid-cols-auto-min-max-185-auto'
        >
          {filteredCharacters.map(({ id, name, thumbnail, description }) => (
            <CharacterListItem
              key={id}
              id={id}
              name={name}
              thumbnail={thumbnail}
              description={description}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default CharactersList;
