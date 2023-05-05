import { CharacterComicDetails } from '@/components/pages/CharacterDetail/interfaces/characterComics';
import Image from '@/components/atoms/Image/Image';
import { useMemo } from 'react';
export interface ComicsListItemProps {
  comic: CharacterComicDetails;
}

export const ComicsListItem = ({ comic }: ComicsListItemProps) => {
  const dateTypes = ['onsaleDate', 'focDate'];

  const filteredDates = useMemo(() => {
    return comic?.dates?.filter((date) => dateTypes.includes(date.type));
  }, [comic]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <li>
      <Image
        path={comic.images[0].path}
        extension={comic.images[0].extension}
        variant='standard_small'
      />
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
