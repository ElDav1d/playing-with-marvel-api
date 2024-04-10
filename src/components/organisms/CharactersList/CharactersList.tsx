import { useFilteredCharacters } from './hooks';
import { CharacterListItem } from '@/components/molecules/CharacterListItem';
import { CharacterItem } from '@/components/pages/Characters/interfaces/characters';
import { useCharactersContext } from '@/components/pages/Characters/hooks';

export interface CharactersListProps {
  characters: CharacterItem[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  const { charactersContextState } = useCharactersContext();
  const filteredCharacters = useFilteredCharacters(characters, charactersContextState.filters);

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
