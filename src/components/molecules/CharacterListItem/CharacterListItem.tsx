/**
 * Represents a character item in the list.
 */
import { Link } from 'react-router-dom';
import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';
import Image from '@/components/atoms/Image';
import { useState } from 'react';

/**
 * Single character item in the list.
 * @interface
 */
export interface CharacterItemProps {
  /**
   * The ID of the character.
   */
  id: number;
  /**
   * The name of the character.
   */
  name: string;
  /**
   * The description of the character.
   */
  description: string;
  /**
   * The thumbnail of the character.
   */
  thumbnail: Thumbnail;
}

const CharacterListItem = ({ id, name, thumbnail, description }: CharacterItemProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const formatUrlName = (name: string): string =>
    name
      .replace(/([()])/g, '')
      .toLowerCase()
      .split(' ')
      .join('-');

  const hasDescription = description && description !== ' ';

  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleClick = () => {
    setIsActive(true);
  };

  const getAccesibleStyles = () => (isFocused || isActive ? ' accesible-outline' : '');

  return (
    <li
      className={`bg-black text-white overflow-hidden relative z-0
      after:absolute after:content[""] after:z-1 after:bottom-0 after:right-0 after:border-8 after:border-t-transparent after:border-r-white after:border-b-white after:border-l-transparent
      ${getAccesibleStyles()}
    `}
    >
      <Link
        className='block group'
        to={`character/${id}/${formatUrlName(name)}`}
        aria-labelledby={id.toString()}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        onClick={handleClick}
      >
        <Image
          classNameContainer='relative
          after:absolute after:content[""] after:bg-red after:h-1 after:w-full after:left-0 after:-bottom-0.5'
          classNameContent='box-border transition ease-in-out delay-gridItem duration-gridItem group-hover:scale-105'
          title={name}
          alt={`The pic of ${name}`}
          ariaId={id.toString()}
          path={thumbnail.path}
          extension={thumbnail.extension}
          sizing={['standard_xlarge', 'standard_fantastic']}
        />
        <div
          className='relative z-0 h-40 p-3
          before:absolute before:transition-[max-height] before:ease-in-out before:delay-gridItem before:duration-gridItem before:content[""] before:h-[105%] before:max-h-[0px] before:bg-red before:w-full before:left-0 before:-top-0.5 before:z-[-1]
          group-hover:before:max-h-[300px]'
        >
          <h3 className='mb-2 font-semibold uppercase text-sm leading-5 line-clamp-2'>{name}</h3>
          {hasDescription && <p className='text-xs leading-5 line-clamp-4'>{description}</p>}
        </div>
      </Link>
    </li>
  );
};

export default CharacterListItem;
