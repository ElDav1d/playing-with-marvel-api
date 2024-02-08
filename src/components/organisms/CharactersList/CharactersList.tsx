import { CharacterItem } from '@/components/pages/Characters/interfaces/characters';
import CharacterListItem from '@/components/molecules/CharacterListItem/CharacterListItem';
export interface CharactersListProps {
  characters: CharacterItem[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <ul className='grid gap-3 grid-flow-row grid-cols-auto-min-max-120-auto md:grid-cols-auto-min-max-195-auto'>
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
