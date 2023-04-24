import Image from '@/components/atoms/Image/Image';
import { ComicsItem } from '@/components/pages/Characters/interfaces/characters';

export interface CharaterProps {
  name: string;
  description: string;
  thumbnailPath: string;
  thumbnailExtension: string;
  comics: ComicsItem[];
}

const Character = ({
  name,
  description,
  thumbnailPath,
  thumbnailExtension,
  comics,
}: CharaterProps) => {
  return (
    <>
      <h1>This is {name}</h1>
      <Image path={thumbnailPath} extension={thumbnailExtension} variant='landscape_incredible' />
      {description ? (
        <p>
          <strong>DESCRIPTION: </strong>
          {description}
        </p>
      ) : null}
      <ul>
        {comics.map((comic) => (
          <li key={comic.name}>{comic.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Character;
