import { Link } from 'react-router-dom';
import { CharacterItem } from '@/interfaces/globals';
import { useCharactersContext } from '@/components/pages/Characters/context/context';
import Image from '@/components/atoms/Image/Image';

const CharacterListItem = ({ id, name, thumbnail, modified, description }: CharacterItem) => {
  const { refProp } = useCharactersContext();

  const formatUrlName = (name: string): string =>
    name
      .replace(/([()])/g, '')
      .toLowerCase()
      .split(' ')
      .join('-');

  return (
    <li ref={refProp}>
      <Link to={`character/${id}/${formatUrlName(name)}`}>
        <Image path={thumbnail.path} extension={thumbnail.extension} variant='standard_small' />
        <h2>{name}</h2>
      </Link>
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
      ) : null}
    </li>
  );
};

export default CharacterListItem;
