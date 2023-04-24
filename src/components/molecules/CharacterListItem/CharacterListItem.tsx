import { Link } from 'react-router-dom';
import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';
import Image from '@/components/atoms/Image/Image';

export interface CharacterItemProps {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
}

const CharacterListItem = ({ id, name, thumbnail, modified, description }: CharacterItemProps) => {
  const formatUrlName = (name: string): string =>
    name
      .replace(/([()])/g, '')
      .toLowerCase()
      .split(' ')
      .join('-');

  return (
    <li>
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
