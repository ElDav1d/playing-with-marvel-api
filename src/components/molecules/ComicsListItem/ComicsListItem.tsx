import Image from '@/components/atoms/Image';
import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';

/**
 * Single comic item in the list.
 * @interface
 */
export interface IComicsListItemProps {
  /**
   * The ID of the comic.
   * @type {number}
   */
  id: number;

  /**
   * The images of the comic.
   * @type {Thumbnail[]}
   */
  images: Thumbnail[];
  /**
   * The title of the comic.
   * @type {string}
   */
  title: string;
  /**
   * The description of the comic.
   * @type {string}
   */
  description: string | null;
}

const ComicsListItem = ({ id, images, title, description }: IComicsListItemProps) => {
  return (
    <li
      aria-label={title}
      className={`bg-black text-white overflow-hidden relative z-0
      after:absolute after:content[""] after:z-1 after:bottom-0 after:right-0 after:border-8 after:border-t-transparent after:border-r-white after:border-b-white after:border-l-transparent
  `}
    >
      <Image
        classNameContainer='relative
        after:absolute after:content[""] after:bg-red after:h-1 after:w-full after:left-0 after:-bottom-0.5'
        classNameContent='box-border transition ease-in-out delay-s duration-l group-hover:scale-105'
        title={title}
        alt={`The cover of ${title}`}
        ariaId={id.toString()}
        path={images[0]?.path}
        extension={images[0]?.extension}
        sizing={['standard_xlarge', 'standard_fantastic']}
      />

      <div
        className='relative z-0 h-40 p-3
          before:absolute before:transition-[max-height] before:ease-in-out before:delay-s before:duration-l before:content[""] before:h-[105%] before:max-h-[0px] before:bg-red before:w-full before:left-0 before:-top-0.5 before:z-[-1]
          group-hover:before:max-h-[300px]'
      >
        <h3 className='mb-2 font-semibold uppercase text-sm leading-5 line-clamp-3'>{title}</h3>

        {description && <p className='text-xs leading-5 line-clamp-3'>{description}</p>}
      </div>
    </li>
  );
};

export default ComicsListItem;
