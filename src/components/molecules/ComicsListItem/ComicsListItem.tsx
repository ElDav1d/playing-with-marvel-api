import Image from '@/components/atoms/Image';
import { useMemo } from 'react';
import { formatDate } from '@/utils/helpers';
import { DateElement } from '@/components/pages/CharacterDetail/interfaces/characterComics';
import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';

/**
 * Single comic item in the list.
 * @interface
 */
export interface IComicsListItemProps {
  /**
   * The dates of the comic.
   * @type {DateElement[]}
   */
  dates: DateElement[];
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
  /**
   * The issue number of the comic.
   * @type {number}
   */
  issueNumber: number;
  /**
   * The modified date of the comic.
   * @type {string}
   */
  modified: string;
}

const ComicsListItem = ({
  dates,
  images,
  title,
  description,
  issueNumber,
  modified,
}: IComicsListItemProps) => {
  const dateTypes = ['onsaleDate', 'focDate'];

  const filteredDates = useMemo(() => {
    return dates?.filter((date) => dateTypes.includes(date.type));
  }, [dates]);

  return (
    <li>
      {images.length > 0 && (
        <Image
          title={title}
          alt={`The pic of ${title}'s cover`}
          path={images[0].path}
          extension={images[0].extension}
          sizing='standard_small'
        />
      )}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <p>
        <small>
          <strong>Issue: </strong>
          {issueNumber}
        </small>
      </p>
      <p>
        <small>
          <strong>Modified: </strong>
          {formatDate(modified)}
        </small>
      </p>
      {filteredDates.map((date) => (
        <p key={date.date}>
          <small>
            <strong>{date.type}: </strong>
            {formatDate(date.date)}
          </small>
        </p>
      ))}
    </li>
  );
};

export default ComicsListItem;
