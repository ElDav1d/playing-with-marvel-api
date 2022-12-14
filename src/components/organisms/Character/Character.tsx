import { CharacterDetail } from '@/interfaces/globals';
import Image from '@/components/atoms/Image/Image';

const Character = ({ name, description, thumbnail, comics }: CharacterDetail) => {
  return (
    <>
      <h1>This is {name}</h1>
      <Image path={thumbnail.path} extension={thumbnail.extension} variant='landscape_incredible' />
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
