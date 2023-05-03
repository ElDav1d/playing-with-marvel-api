import { Link, useParams } from 'react-router-dom';
import { useCharacterDetails, useCharacterComics } from './hooks';
import Character from '@/components/organisms/Character/Character';
import { ComicsList } from '@/components/organisms/ComicsList/ComicsList';
import { MAX_CHARACTER_COMICS } from '@/utils/constants';
import { useState } from 'react';

const CharacterDetail = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(0);

  const { isLoadingCharacter, isErrorOnCharacter, character } = useCharacterDetails(id);

  const { isLoadingComics, isErrorOnComics, comics, refetch } = useCharacterComics(
    id,
    MAX_CHARACTER_COMICS,
    page,
  );

  const handlePrevPage = () => {
    setPage(page - 1);
    refetch();
  };

  const handleNextPage = () => {
    setPage(page + 1);
    refetch();
  };

  const isLoading = isLoadingCharacter || isLoadingComics;
  const isError = isErrorOnCharacter || isErrorOnComics;

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
      {comics && <ComicsList comics={comics} />}
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>Ooops, try reloading again</h2>}
      <button onClick={handlePrevPage}>Previous Comics</button>
      <button onClick={handleNextPage}>Next Comics</button>
      <Link to='/'>Home</Link>
    </>
  );
};

export default CharacterDetail;
