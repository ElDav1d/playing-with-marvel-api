import { CharacterComicDetails } from '@/components/pages/CharacterDetail/interfaces/characterComics';
import Image from '@/components/atoms/Image/Image';
import { useMemo } from 'react';
import { formatDate } from '@/utils/helpers';
export interface ComicsListItemProps {
  comic: CharacterComicDetails;
}

export const ComicsListItem = ({ comic }: ComicsListItemProps) => {
  const dateTypes = ['onsaleDate', 'focDate'];

  const filteredDates = useMemo(() => {
    return comic?.dates?.filter((date) => dateTypes.includes(date.type));
  }, [comic]);

  return (
    <li>
      {comic.images.length > 0 && (
        <Image
          title={comic.title}
          alt={`Pic of ${comic.title}'s cover`}
          path={comic.images[0].path}
          extension={comic.images[0].extension}
          variant='standard_small'
        />
      )}
      <h3>{comic.title}</h3>
      <p>{comic.description}</p>
      <p>
        <small>
          <strong>Issue: </strong>
          {comic.issueNumber}
        </small>
      </p>
      <p>
        <small>
          <strong>Modified: </strong>
          {formatDate(comic.modified)}
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
