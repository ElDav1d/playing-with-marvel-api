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

  const { isErrorOnComics, comics, isFetchingComics, refetch } = useCharacterComics(
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

  const isError = isErrorOnCharacter || isErrorOnComics;

  return (
    <>
      {isLoadingCharacter && <h2>Loading Character Details...</h2>}
      {character && (
        <Character
          name={character.name}
          description={character.description}
          thumbnailPath={character.thumbnail.path}
          thumbnailExtension={character.thumbnail.extension}
        />
      )}
      {isFetchingComics && <h2>Loading Character Comics</h2>}
      {comics && <ComicsList comics={comics} />}
      {isError && <h2>Ooops, try reloading again</h2>}
      <button onClick={handlePrevPage}>Previous Comics</button>
      <button onClick={handleNextPage}>Next Comics</button>
      <Link to='/'>Home</Link>
    </>
  );
};

export default CharacterDetail;
