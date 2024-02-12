import { ChangeEvent, useEffect, useRef, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCharacters, useDebounce } from './hooks';
import { CharacterItem, FetchingOrder, FilterCriteria } from './interfaces/characters';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import {
  LOADER_SIZE,
  MARVEL_RED,
  MAX_FETCH_CHARACTERS_DEFAULT,
  MAX_FETCH_CHARACTERS_OPTIM,
  MAX_FETCH_CHARACTERS_TOP,
  REGEX_IMAGE_PATH,
} from '@/utils/constants';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Container from '@/components/organisms/Container';
import { RingLoader } from 'react-spinners';
import SideDrawer from '@/components/organisms/SideDrawer';
import CharactersControlPanel from '@/components/organisms/CharactersControlPanel';

const Characters = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchString, setSearchString] = useState<string>('');
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.NAME_AZ);
  const [onClearData, setOnClearData] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterCriteria[]>([]);
  const maxCharactersRef = useRef(MAX_FETCH_CHARACTERS_DEFAULT);

  const { isError, characters, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useCharacters({ maxCharacters: maxCharactersRef.current, searchString, order, onClearData });

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (onClearData) {
      setOnClearData(false);
    }
  }, [order, searchString]);

  useDebounce(searchInput, 500, () => setSearchString(searchInput));

  const filterLiterals = ['With Image', 'With Description'];

  const filteredCharacters = useMemo(() => {
    const hasImage = (path: string) => !REGEX_IMAGE_PATH.test(path);
    const hasDescription = (description: string) => description && description !== ' ';

    let maxCharacters;
    let filterCallback;

    switch (true) {
      case filters.includes(FilterCriteria.IMAGE) && filters.includes(FilterCriteria.DESCRIPTION):
        maxCharacters = MAX_FETCH_CHARACTERS_TOP;
        filterCallback = (character: CharacterItem) =>
          hasImage(character.thumbnail.path) && hasDescription(character.description);
        break;

      case filters.includes(FilterCriteria.IMAGE):
        maxCharacters = MAX_FETCH_CHARACTERS_OPTIM;
        filterCallback = (character: CharacterItem) => hasImage(character.thumbnail.path);
        break;

      case filters.includes(FilterCriteria.DESCRIPTION):
        maxCharacters = MAX_FETCH_CHARACTERS_OPTIM;
        filterCallback = (character: CharacterItem) => hasDescription(character.description);
        break;

      default:
        maxCharactersRef.current = MAX_FETCH_CHARACTERS_DEFAULT;
        return characters;
    }

    maxCharactersRef.current = maxCharacters;
    return characters.filter(filterCallback);
  }, [characters, filters]);

  const orderHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as FetchingOrder;

    setOnClearData(true);
    setOrder(value);
  };

  const hasListDefaults =
    searchInput === '' && order === FetchingOrder.NAME_AZ && filters.length === 0;

  const orderLiterals = [
    'By name A/Z',
    'By name Z/A',
    'By modification First/Last',
    'By modification Last/First',
  ];

  return (
    <>
      <Header classNameHeader='flex'>
        <SideDrawer classNameContainer='bg-black md:hidden'>
          <CharactersControlPanel
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchTitle={'Search by name'}
            searchPlaceholder={'Type a character name'}
            setOnClearData={setOnClearData}
            isEmptyData={!isFetching && filteredCharacters?.length === 0}
            emptyDataLiteral={
              // eslint-disable-next-line quotes
              "Sorry, none of our characters' name matches your search! Try typing again"
            }
            orderTitle='Order results'
            onOrderChange={(event) => orderHandler(event)}
            orderOptions={Object.values(FetchingOrder)}
            orderLiterals={orderLiterals}
            filtersTitle='Filter results:'
            filtersOptions={Object.values(FilterCriteria)}
            filtersLiterals={filterLiterals}
            setFilters={setFilters}
          />
        </SideDrawer>
      </Header>
      <Container element={'main'}>
        <section
          className='relative z-0 bg-black py-10 mb-4 bg-hero-image bg-center bg-cover
        before:absolute  before:content[""] before:h-full before:w-full  before:bg-gradient-to-b before:from-trans-0.75-black before:from-50% before:left-0 before:top-0 before:z-[-1]'
        >
          <Container element={'div'}>
            <div className='w-full text-white text-center mb-4'>
              <h2 className='text-2xl font-semibold text-white text-center uppercase mb-1'>
                Marvel Characters
              </h2>
              <p className='text-sm text-center'>
                Get hooked on a hearty helping of heroes and villains from the humble House of
                Ideas!
              </p>

              {!hasListDefaults && (
                <p className='text-sm'>
                  Results for
                  {searchInput && <strong> {searchInput}</strong>}
                  {filters && <strong> {filters}</strong>}
                  {order && <strong> {order}</strong>}
                </p>
              )}
            </div>
            <div className='hidden md:flex gap-8 justify-center'>
              <CharactersControlPanel
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                searchTitle={'Search by name'}
                searchPlaceholder={'Type a character name'}
                setOnClearData={setOnClearData}
                isEmptyData={!isFetching && filteredCharacters?.length === 0}
                emptyDataLiteral={
                  // eslint-disable-next-line quotes
                  "Sorry, none of our characters' name matches your search! Try typing again"
                }
                orderTitle='Order results'
                onOrderChange={(event) => orderHandler(event)}
                orderOptions={Object.values(FetchingOrder)}
                orderLiterals={orderLiterals}
                filtersTitle='Filter results:'
                filtersOptions={Object.values(FilterCriteria)}
                filtersLiterals={filterLiterals}
                setFilters={setFilters}
              />
            </div>
          </Container>
        </section>
        {isError && <h2>Oooops...try reloading again!</h2>}

        {isFetching && !isFetchingNextPage && (
          <RingLoader color={MARVEL_RED} size={LOADER_SIZE} className='mx-auto my-6' />
        )}

        {filteredCharacters?.length > 0 && (
          <Container>
            <CharactersList characters={filteredCharacters} />
          </Container>
        )}

        {hasNextPage && (
          <div ref={ref}>
            <RingLoader color={MARVEL_RED} size={LOADER_SIZE} className='mx-auto my-6' />
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Characters;
