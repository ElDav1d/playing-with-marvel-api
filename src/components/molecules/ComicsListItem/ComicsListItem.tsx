import { CharacterComicDetails } from '@/components/pages/CharacterDetail/interfaces/characterComics';

export interface ComicsListItemProps {
  comic: CharacterComicDetails;
}

export const ComicsListItem = ({ comic }: ComicsListItemProps) => {
  return (
    <li>
      <h3>{comic.title}</h3>
    </li>
  );
};
