import { ComicsListItem } from '@/components/molecules/ComicsListItem';
import { CharacterComicDetails } from '@/components/pages/CharacterDetail/interfaces/characterComics';

export interface ComicsListProps {
  comics: CharacterComicDetails[];
}

export const ComicsList = ({ comics }: ComicsListProps) => {
  return (
    <ul
      aria-live='polite'
      className='grid gap-3 grid-flow-row grid-cols-auto-min-max-120-auto md:grid-cols-auto-min-max-185-auto'
    >
      {comics.map(({ id, dates, images, title, description, issueNumber, modified }) => (
        <ComicsListItem
          key={id}
          dates={dates}
          images={images}
          title={title}
          description={description}
          issueNumber={issueNumber}
          modified={modified}
        />
      ))}
    </ul>
  );
};
