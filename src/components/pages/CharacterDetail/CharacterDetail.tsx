import { useParams } from 'react-router-dom';
import { useCharacterDetails, useCharacterComics } from './hooks';
import CharacterDetailHeroSection from '@/components/organisms/CharacterDetailHeroSection/CharacterDetailHeroSection';
import { LOADER_SIZE, MARVEL_RED, MAX_FETCH_CHARACTER_COMICS } from '@/utils/constants';
import { ChangeEvent, useEffect, useState } from 'react';
import { FetchingOrder, HumanizedOrder } from './interfaces/characterComics';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Container from '@/components/organisms/Container';
import { RingLoader } from 'react-spinners';
import { ComicsList } from '@/components/organisms/ComicsList';
import { ComicsSelectGroup } from '@/components/molecules/ComicsSelectGroup';

const CharacterDetail = () => {
  const LOADING_LABEL = 'Character Details are loading';
  const { id } = useParams();
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.TITLE_AZ);
  const [onClearData, setOnClearData] = useState<boolean>(false);

  const { isLoadingCharacter, isErrorOnCharacter, character } = useCharacterDetails({
    characterId: id,
  });

  const {
    comics,
    totalComics,
    rangeInit,
    rangeEnd,
    isErrorOnComics,
    isFetchingComics,
    isFirstPage,
    isLastPage,
    refetch,
  } = useCharacterComics({
    characterId: id,
    maxComics: MAX_FETCH_CHARACTER_COMICS,
    page,
    order,
    onClearData,
  });

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

  const orderLiterals = Object.values(HumanizedOrder);

  return (
    <>
      <Header />
      <Container element={'main'} aria-label='character detail main content'>
        {isError && <h2>Ooops, try refreshing your browser</h2>}

        {isLoadingCharacter && (
          <RingLoader
            color={MARVEL_RED}
            size={LOADER_SIZE}
            className='mx-auto my-24'
            role='alert'
            aria-label={LOADING_LABEL}
            aria-busy='true'
            aria-live='polite'
          />
        )}

        {character && (
          <article aria-label='character detail article'>
            {character && (
              <CharacterDetailHeroSection
                name={character.name}
                description={character.description}
                thumbnailPath={character.thumbnail.path}
                thumbnailExtension={character.thumbnail.extension}
              />
            )}

            <Container element='section'>
              {comics && comics.length > 1 && (
                <ComicsSelectGroup
                  classNameSelect='w-1/4'
                  inputAriaLabel='Order comics by:'
                  title='Order comics by:'
                  onChange={(event) => orderHandler(event)}
                  options={Object.values(FetchingOrder)}
                  optionLiterals={orderLiterals}
                />
              )}

              {isFetchingComics && <h2>Loading Character Comics</h2>}

              {comics && comics.length > 0 ? (
                <>
                  <h3 className='mb-2'>
                    Displaying {rangeInit} to {rangeEnd} from {totalComics} available comics
                  </h3>
                  <ComicsList comics={comics} />
                </>
              ) : (
                <h3>{character.name} has not comics</h3>
              )}

              {!isFirstPage && <button onClick={handlePrevPage}>Previous Comics</button>}
              {!isLastPage && <button onClick={handleNextPage}>Next Comics</button>}
            </Container>
          </article>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default CharacterDetail;
