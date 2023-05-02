import { Link, useParams } from 'react-router-dom';
import { useCharacterDetails, useCharacterComics } from './hooks';
import Character from '@/components/organisms/Character/Character';
import { ComicsList } from '@/components/organisms/ComicsList/ComicsList';

const CharacterDetail = () => {
  const { id } = useParams();

  const { isLoading, isError, character } = useCharacterDetails(id);

  const { isLoadingComics, isErrorOnComics, comics } = useCharacterComics(id);

  console.log(comics);
  return (
    <>
      {character && (
        <Character
          name={character.name}
          description={character.description}
          thumbnailPath={character.thumbnail.path}
          thumbnailExtension={character.thumbnail.extension}
        />
      )}
      {character && comics && <ComicsList comics={comics} />}
      {isLoading || (isLoadingComics && <h2>Loading...</h2>)}
      {isError || (isErrorOnComics && <h2>Ooops, try reloading again</h2>)}
      <Link to='/'>Home</Link>
    </>
  );
};

export default CharacterDetail;
