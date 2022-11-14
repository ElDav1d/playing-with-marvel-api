import { Link } from 'react-router-dom';
import { CharacterItem } from '../../../interfaces/globals';

const CharacterListItem = ({ id, name, thumbnail, modified, description }: CharacterItem) => {
  const formatUrlName = (name: string): string =>
    name
      .replace(/([()])/g, '')
      .toLowerCase()
      .split(' ')
      .join('-');

  return (
    <li key={id}>
      <Link to={`character/${id}/${formatUrlName(name)}`}>
        <h2>{name}</h2>
      </Link>
      <p>
        <small>
          <strong>thumbnail: </strong>
          {thumbnail.path}
        </small>
      </p>
      <p>
        <small>
          <strong>modified: </strong>
          {modified}
        </small>
      </p>
      {description ? (
        <p>
          <strong>DESCRIPTION: </strong>
          {description}
        </p>
      ) : (
        <p>
          <strong>DESCRIPTION NOT AVAILABLE</strong>
        </p>
      )}
    </li>
  );
};

export default CharacterListItem;
