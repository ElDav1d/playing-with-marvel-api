import { Link } from 'react-router-dom';
import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';
import Image from '@/components/atoms/Image/Image';
export interface CharacterItemProps {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

const CharacterListItem = ({ id, name, thumbnail, description }: CharacterItemProps) => {
  const formatUrlName = (name: string): string =>
    name
      .replace(/([()])/g, '')
      .toLowerCase()
      .split(' ')
      .join('-');

  const hasDescription = description && description !== ' ';

  return (
    <li className='bg-black text-white'>
      <Link to={`character/${id}/${formatUrlName(name)}`}>
        <Image path={thumbnail.path} extension={thumbnail.extension} variant='standard_fantastic' />
        <div className='p-3 h-40'>
          <h2 className='font-bold uppercase mb-2 text-2xl'>{name}</h2>
          {hasDescription && <p className='text-2xl line-clamp-4'>{description}</p>}
        </div>
      </Link>
    </li>
  );
};

export default CharacterListItem;
