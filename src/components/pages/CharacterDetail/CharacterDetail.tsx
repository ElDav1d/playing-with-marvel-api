import { Link, useParams } from 'react-router-dom';
import { useCharacterDetails, useCharacterComics } from './hooks';
import Character from '@/components/organisms/Character/Character';
import { ComicsList } from '@/components/organisms/ComicsList/ComicsList';
import { MAX_CHARACTER_COMICS } from '@/utils/constants';
import { useEffect, useState } from 'react';

const CharacterDetail = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(0);

  const { isLoadingCharacter, isErrorOnCharacter, character } = useCharacterDetails(id);

  const {
    comics,
    totalComics,
    rangeInit,
    rangeEnd,
    isErrorOnComics,
    isFetchingComics,
    isFirstPage,
    isLastPage,
    isPreviousData,
    refetch,
  } = useCharacterComics(id, MAX_CHARACTER_COMICS, page);

  useEffect(() => {
    refetch();
  }, [page]);

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const isError = isErrorOnCharacter || isErrorOnComics;

  return (
    <>
      <header>
        <nav>
          <Link to='/'>Home</Link>
        </nav>

        {isError && <h2>Ooops, try refreshing your browser</h2>}

        {isLoadingCharacter && <h2>Loading Character Details...</h2>}
      </header>

      <main>
        <article>
          <section>
            {character && (
              <Character
                name={character.name}
                description={character.description}
                thumbnailPath={character.thumbnail.path}
                thumbnailExtension={character.thumbnail.extension}
              />
            )}
          </section>

          <section>
            {isFetchingComics && <h2>Loading Character Comics</h2>}

            {comics?.length > 0 ? (
              <>
                <h3>
                  Displaying {rangeInit} to {rangeEnd} from {totalComics} available comics
                </h3>
                <ComicsList comics={comics} />
              </>
            ) : null}
          </section>
        </article>
      </main>

      <footer>
        {!isPreviousData && !isFirstPage && (
          <button onClick={handlePrevPage}>Previous Comics</button>
        )}
        {!isPreviousData && !isLastPage && <button onClick={handleNextPage}>Next Comics</button>}
      </footer>
    </>
  );
};

export default CharacterDetail;
