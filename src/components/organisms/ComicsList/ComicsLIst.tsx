import { ComicsItem } from '@/components/pages/Characters/interfaces/characters';

export interface ComicsListProps {
  comics: ComicsItem[];
}

export const ComicsLIst = ({ comics }: ComicsListProps) => {
  return (
    <ul>
      {comics.map((comic) => (
        <li key={comic.name}>{comic.name}</li>
      ))}
    </ul>
  );
};
