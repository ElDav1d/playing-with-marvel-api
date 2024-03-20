import { ComicsListItem } from '@/components/molecules/ComicsListItem';
import { CharacterComicDetails } from '@/components/pages/CharacterDetail/interfaces/characterComics';

export interface IComicsListProps {
  comics: CharacterComicDetails[];
}

const ComicsList = ({ comics }: IComicsListProps) => {
  return (
    <ul
      aria-live='polite'
      className='grid gap-3 grid-flow-row grid-cols-auto-min-max-120-auto md:grid-cols-auto-min-max-185-auto'
    >
      {comics.map(({ id, images, title, description }) => (
        <ComicsListItem key={id} id={id} images={images} title={title} description={description} />
      ))}
    </ul>
  );
};

export default ComicsList;
