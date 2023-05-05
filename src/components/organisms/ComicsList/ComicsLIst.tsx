import { ComicsListItem } from '@/components/molecules/ComicsListItem/ComicsListItem';
import { CharacterComicDetails } from '@/components/pages/CharacterDetail/interfaces/characterComics';

export interface ComicsListProps {
  comics: CharacterComicDetails[];
}

export const ComicsList = ({ comics }: ComicsListProps) => {
  return (
    <ul>
      {comics.map((comic) => (
        <ComicsListItem comic={comic} key={comic.id} />
      ))}
    </ul>
  );
};
