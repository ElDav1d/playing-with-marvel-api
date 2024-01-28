import { CharacterItem } from '@/components/pages/Characters/interfaces/characters';
import CharacterListItem from '@/components/molecules/CharacterListItem/CharacterListItem';
export interface CharactersListProps {
  characters: CharacterItem[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <ul className='grid gap-3 grid-cols-2 sm:grid-cols-4'>
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
