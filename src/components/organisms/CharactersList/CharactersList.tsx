import { CharacterListItem } from '@/components/molecules/CharacterListItem';
import { CharacterItem } from '@/components/pages/Characters/interfaces/characters';

export interface CharactersListProps {
  characters: CharacterItem[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <ul
      aria-live='polite'
      className='grid gap-3 grid-flow-row grid-cols-auto-min-max-120-auto md:grid-cols-auto-min-max-185-auto'
    >
      {characters.map(({ id, name, thumbnail, description }) => (
        <CharacterListItem
          key={id}
          id={id}
          name={name}
          thumbnail={thumbnail}
          description={description}
        />
      ))}
    </ul>
  );
};

export default CharactersList;
