import { CharacterItem } from '@/components/pages/Characters/interfaces/characters';
import CharacterListItem from '@/components/molecules/CharacterListItem/CharacterListItem';
export interface CharactersListProps {
  characters: CharacterItem[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <ul>
      {characters.map(({ id, name, thumbnail, modified, description }) => (
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
