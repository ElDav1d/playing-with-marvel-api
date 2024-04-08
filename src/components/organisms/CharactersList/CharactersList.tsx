import { CharacterListItem } from '@/components/molecules/CharacterListItem';
import { useFiltersContext } from '@/components/pages/Characters/hooks';
import { CharacterItem, FilterCriteria } from '@/components/pages/Characters/interfaces/characters';
import { REGEX_IMAGE_PATH } from '@/utils/constants';
import { useMemo } from 'react';
import { useFilteredCharacters } from './hooks';

export interface CharactersListProps {
  characters: CharacterItem[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  const { filtersContextState } = useFiltersContext();
  const filteredCharacters = useFilteredCharacters(characters, filtersContextState);

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
