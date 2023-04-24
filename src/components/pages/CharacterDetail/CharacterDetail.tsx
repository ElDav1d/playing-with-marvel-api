import { Link, useParams } from 'react-router-dom';
import Character from '@/components/organisms/Character/Character';
import { useCharacterDetailEffect } from '@/services';

const CharacterDetail = () => {
  const { id } = useParams();
  const { characterData, isLoading, error } = useCharacterDetailEffect(id);

  console.log(characterData);

  const { name, description, thumbnail, comics } = characterData;

  return (
    <>
      {characterData && (
        <Character
          name={name}
          description={description}
          thumbnailPath={thumbnail.path}
          thumbnailExtension={thumbnail.extension}
          comics={comics.items}
        />
      )}
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Ooops, try reloading again</h2>}
      <Link to='/'>Home</Link>
    </>
  );
};

export default CharacterDetail;
