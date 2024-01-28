import { Link, useParams } from 'react-router-dom';
import { useCharacterDetails, useCharacterComics } from './hooks';
import SelectorGroup from '@/components/molecules/SelectorGroup/SelectorGroup';
import Character from '@/components/organisms/Character/Character';
import { ComicsList } from '@/components/organisms/ComicsList/ComicsList';
import { MAX_CHARACTER_COMICS } from '@/utils/constants';
import { ChangeEvent, useEffect, useState } from 'react';
import { FetchingOrder } from './interfaces/characterComics';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Container from '@/components/organisms/Container';

const CharacterDetail = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.FOC_DATE_FIRST);
  const [onClearData, setOnClearData] = useState<boolean>(false);

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
  } = useCharacterComics(id, MAX_CHARACTER_COMICS, page, onClearData);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (onClearData) {
      setOnClearData(false);
    }
  }, [order]);

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const isError = isErrorOnCharacter || isErrorOnComics;

  const orderHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as FetchingOrder;

    setOnClearData(true);
    setOrder(value);
    setPage(0);
  };

  const orderLiterals = Object.values(FetchingOrder);

  return (
    <>
      <Header />
      <Container tag={'main'}>
        {isError && <h2>Ooops, try refreshing your browser</h2>}

        {isLoadingCharacter && <h2>Loading Character Details...</h2>}

        {character && (
          <article>
            <section>
              <Character
                name={character.name}
                description={character.description}
                thumbnailPath={character.thumbnail.path}
                thumbnailExtension={character.thumbnail.extension}
              />
            </section>

            <section>
              <SelectorGroup
                title='Order results:'
                onChange={(event) => orderHandler(event)}
                options={Object.values(FetchingOrder)}
                optionLiterals={orderLiterals}
              />

              {isFetchingComics && <h2>Loading Character Comics</h2>}

              {comics?.length > 0 ? (
                <>
                  <h3>
                    Displaying {rangeInit} to {rangeEnd} from {totalComics} available comics
                  </h3>
                  <ComicsList comics={comics} />
                </>
              ) : (
                <h3>{character.name} has not comics</h3>
              )}

              {!isPreviousData && !isFirstPage && (
                <button onClick={handlePrevPage}>Previous Comics</button>
              )}
              {!isPreviousData && !isLastPage && (
                <button onClick={handleNextPage}>Next Comics</button>
              )}
            </section>
          </article>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default CharacterDetail;
