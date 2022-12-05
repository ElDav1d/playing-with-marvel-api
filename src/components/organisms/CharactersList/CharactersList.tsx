import { useState, useEffect } from 'react';
import { CharacterItem } from '@/interfaces/globals';
import { CRITERIA } from '@/utils/constants';
import CharacterListItem from '@/components/molecules/CharacterListItem/CharacterListItem';
export interface CharactersListProps {
  filters: string[];
  characters: CharacterItem[];
}

const CharactersList = ({ filters, characters }: CharactersListProps) => {
  const [stack, setStack] = useState<CharacterItem[]>([]);
  const [filterState, setFilterState] = useState<string[]>([]);
  const isDescriptionFiltered = filterState.includes(CRITERIA.filters[0]);
  const isImageFiltered = filterState.includes(CRITERIA.filters[1]);

  const filterByDescription = (data: CharacterItem[]): CharacterItem[] =>
    [...data].filter((item) => item.description !== '');

  const filterByImage = (data: CharacterItem[]): CharacterItem[] =>
    [...data].filter((item) => !item.thumbnail.path.includes('image_not_available'));

  useEffect(() => {
    setStack(characters);
    setFilterState(filters);
  }, [filters, characters]);

  useEffect(() => {
    if (isDescriptionFiltered && isImageFiltered) {
      setStack(filterByDescription(filterByImage(stack)));
    } else if (isDescriptionFiltered) {
      setStack(filterByDescription(stack));
    } else if (isImageFiltered) {
      setStack(filterByImage(stack));
    } else {
      setStack(characters);
    }
  }, [filterState]);

  return (
    <ul>
      {stack.map(({ id, name, thumbnail, modified, description }) => (
        <CharacterListItem
          key={id}
          id={id}
          name={name}
          thumbnail={thumbnail}
          modified={modified}
          description={description}
        />
      ))}
    </ul>
  );
};

export default CharactersList;
