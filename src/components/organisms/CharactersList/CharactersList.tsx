import { useState, useEffect } from 'react';
import { CharacterItem } from '@/interfaces/globals';
import { CRITERIA } from '@/utils/constants';
import { useCharactersContext } from '@/components/pages/Characters/context';
import CharacterListItem from '@/components/molecules/CharacterListItem/CharacterListItem';
export interface CharactersListProps {
  isLoading: boolean;
  filters: string[];
  characters: CharacterItem[];
}

const CharactersList = ({ isLoading, filters, characters }: CharactersListProps) => {
  const [stack, setStack] = useState<CharacterItem[]>([]);
  const isDescriptionFiltered = filters.includes(CRITERIA.filters[0]);
  const isImageFiltered = filters.includes(CRITERIA.filters[1]);
  const { setCounter } = useCharactersContext();

  const filterByDescription = (data: CharacterItem[]): CharacterItem[] =>
    [...data].filter((item) => item.description !== '');

  const filterByImage = (data: CharacterItem[]): CharacterItem[] =>
    [...data].filter((item) => !item.thumbnail.path.includes('image_not_available'));

  useEffect(() => {
    setStack(characters);
  }, [filters]);

  useEffect(() => {
    setCounter && setCounter(stack.length);
  }, [stack]);

  useEffect(() => {
    if (isDescriptionFiltered && isImageFiltered) {
      setStack(filterByDescription(filterByImage(characters)));
    } else if (isDescriptionFiltered) {
      setStack(filterByDescription(characters));
    } else if (isImageFiltered) {
      setStack(filterByImage(characters));
    } else {
      setStack(characters);
    }
  }, [filters, characters]);

  return (
    <>
      <ul>
        {stack.map(({ id, name, thumbnail, modified, description }, index) => (
          <CharacterListItem
            key={index}
            id={id}
            name={name}
            thumbnail={thumbnail}
            modified={modified}
            description={description}
          />
        ))}
      </ul>
      {isLoading && <h2>Loading...</h2>}
    </>
  );
};

export default CharactersList;
