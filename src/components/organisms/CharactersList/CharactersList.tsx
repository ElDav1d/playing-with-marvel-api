import { useFilteredCharacters } from './hooks';
import { CharacterListItem } from '@/components/molecules/CharacterListItem';
import { FetchingOrder } from '@/components/pages/Characters/interfaces/characters';
import { useCharacters, useCharactersContext } from '@/components/pages/Characters/hooks';
import { useEffect } from 'react';

export interface CharactersListProps {
  inView: boolean;
  searchString: string;
  order: FetchingOrder;
  onClearData: boolean;
}

const CharactersList = ({ inView, searchString, order, onClearData }: CharactersListProps) => {
  const ERROR_MESSAGE = 'Oooops...unexpected error!! Try reloading again';
  const { charactersContextState } = useCharactersContext();

  const { characters, isError, fetchNextPage } = useCharacters({
    searchString,
    order,
    onClearData,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const filteredCharacters = useFilteredCharacters(characters, charactersContextState.filters);

  return (
    <>
      {isError && <h2>{ERROR_MESSAGE}</h2>}

      {!isError && filteredCharacters?.length > 0 && (
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
