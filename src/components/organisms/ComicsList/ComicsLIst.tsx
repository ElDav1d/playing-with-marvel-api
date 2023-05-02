import { CharacterComicDetails } from '@/components/pages/CharacterDetail/interfaces/characterComics';

export interface ComicsListProps {
  comics: CharacterComicDetails[];
}

export const ComicsList = ({ comics }: ComicsListProps) => {
  return (
    <ul>
      {comics.map((comic) => (
        <li key={comic.title}>{comic.title}</li>
      ))}
    </ul>
  );
};
