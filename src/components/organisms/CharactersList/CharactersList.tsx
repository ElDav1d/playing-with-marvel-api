import { CharacterItem } from '../../../interfaces/globals';
import CharacterListItem from '../../molecules/CharacterListItem/CharacterListItem';
export interface CharactersListProps {
  characters: CharacterItem[];
}

const CharactersList = ({ characters }: CharactersListProps) => {

  return (
    <ul>
      {characters.map(({ id, name, thumbnail, modified, description }) => (
        <>
          <CharacterListItem
            id={id}
            name={name}
            thumbnail={thumbnail}
            modified={modified}
            description={description}
          />
        </>
      ))}
    </ul>
  );
};

export default CharactersList;
