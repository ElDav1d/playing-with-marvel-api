import { Link } from 'react-router-dom';
import { CharacterItem } from '../../../interfaces/globals';
export interface CharactersListProps {
  characters: CharacterItem[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <Link to={`character/${character.id}/${character.name}`}>
            <h2>{character.name}</h2>
          </Link>
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
