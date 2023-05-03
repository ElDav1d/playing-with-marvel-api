import { CharacterComicDetails } from '@/components/pages/CharacterDetail/interfaces/characterComics';

export interface ComicsListProps {
  comics: CharacterComicDetails[];
}

export const ComicsList = ({ comics }: ComicsListProps) => {
  return (
    <ul>
      {comics.map((comic) => (
        <li key={comic.id}>
          <h3>{comic.title}</h3>
        </li>
      ))}
    </ul>
  );
};
