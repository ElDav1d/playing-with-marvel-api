import { CharacterItem } from '@/interfaces/globals';
import CharacterListItem from '@/components/molecules/CharacterListItem/CharacterListItem';
export interface CharactersListProps {
  characters: CharacterItem[] | undefined;
}

const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <>
      {characters && (
        <ul>
          {characters.map(({ id, name, thumbnail, modified, description }, index) => (
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
      )}
    </>
  );
};

export default CharactersList;
