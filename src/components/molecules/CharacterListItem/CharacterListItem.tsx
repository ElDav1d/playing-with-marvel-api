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
    <li
      className='group bg-black text-white overflow-hidden relative z-0
      after:absolute after:content[""] after:z-1 after:bottom-0 after:right-0 after:border-8 after:border-t-transparent after:border-r-white after:border-b-white after:border-l-transparent
    '
    >
      <Link to={`character/${id}/${formatUrlName(name)}`}>
        <div
          className='relative
          after:absolute after:content[""] after:bg-red after:h-1 after:w-full after:left-0 after:bottom-0 '
        >
          <Image
            className='box-border bg-red transition ease-in-out delay-gridItem duration-gridItem group-hover:scale-105 '
            title={name}
            alt={`A pic of ${name}`}
            path={thumbnail.path}
            extension={thumbnail.extension}
            variant='standard_fantastic'
          />
        </div>
        <div
          className='p-3 h-40 relative z-0
          before:absolute before:transition-[max-height] before:ease-in-out before:delay-gridItem before:duration-gridItem before:content[""] before:h-full before:max-h-[0px] before:bg-red before:w-full before:left-0 before:top-0 before:z-[-1]
          group-hover:before:max-h-[300px]'
        >
          <h2 className='mb-2 font-semibold uppercase text-sm leading-5 line-clamp-2'>{name}</h2>
          {hasDescription && <p className='text-xs leading-5 line-clamp-4'>{description}</p>}
        </div>
      </Link>
    </li>
  );
};

export default CharacterListItem;
