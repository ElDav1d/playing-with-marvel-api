export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Character {
  description: string;
  id: number;
  name: string;
  modified: string;
  thumbnail: Thumbnail;
}

export interface CharactersListProps {
  characters: Character[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <h2>{character.name}</h2>
          <p>
            <small>
              <strong>thumbnail: </strong>
              {character.thumbnail.path}
            </small>
          </p>
          <p>
            <small>
              <strong>modified: </strong>
              {character.modified}
            </small>
          </p>
          {character.description ? (
            <p>
              <strong>DESCRIPTION: </strong>
              {character.description}
            </p>
          ) : (
            <p>
              <strong>DESCRIPTION NOT AVAILABLE</strong>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
