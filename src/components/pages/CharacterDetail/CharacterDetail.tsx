import { Link, useParams } from 'react-router-dom';
import { useCharacterDetails } from './hooks/useCharacterDetails';
import Character from '@/components/organisms/Character/Character';
import { ComicsLIst } from '@/components/organisms/ComicsList/ComicsLIst';

const CharacterDetail = () => {
  const { id } = useParams();

  const { isLoading, isError, character } = useCharacterDetails(id);

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
      {character?.comics?.items && <ComicsLIst comics={character.comics.items} />}
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>Ooops, try reloading again</h2>}
      <Link to='/'>Home</Link>
    </>
  );
};

export default CharacterDetail;
