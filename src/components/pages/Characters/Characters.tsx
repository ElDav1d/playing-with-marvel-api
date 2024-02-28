import { ChangeEvent, useEffect, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCharacters, useDebounce, useListControlInfo } from './hooks';
import {
  CharacterItem,
  FetchingOrder,
  FilterCriteria,
  HumanizedOrder,
} from './interfaces/characters';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import {
  EMPTY_DATA_LITERAL_LIST,
  LOADER_SIZE,
  MARVEL_RED,
  MAX_FETCH_CHARACTERS,
  REGEX_IMAGE_PATH,
} from '@/utils/constants';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Container from '@/components/organisms/Container';
import { RingLoader } from 'react-spinners';
import SideDrawer from '@/components/organisms/SideDrawer';
import CharactersControlPanel from '@/components/organisms/CharactersControlPanel';
import { ControlPanelInfo } from '@/components/molecules/ControlPanelInfo';

const Characters = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchString, setSearchString] = useState<string>('');
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.NAME_AZ);
  const [onClearData, setOnClearData] = useState(false);
  const [filters, setFilters] = useState<FilterCriteria[]>([]);
  const [onClearFilters, setOnClearFilters] = useState(false);

  const { isError, characters, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useCharacters({ maxCharacters: MAX_FETCH_CHARACTERS, searchString, order, onClearData });

  const listControlInfoItems = useListControlInfo({
    describer: 'Results',
    searchInput,
    order: HumanizedOrder[order],
    filters,
  });

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

  const filteredCharacters = useMemo(() => {
    const hasImage = (path: string) => !REGEX_IMAGE_PATH.test(path);
    const hasDescription = (description: string) => description && description !== ' ';

    let filterCallback;

    switch (true) {
      case filters.includes(FilterCriteria.IMAGE) && filters.includes(FilterCriteria.DESCRIPTION):
        filterCallback = (character: CharacterItem) =>
          hasImage(character.thumbnail.path) && hasDescription(character.description);
        break;

      case filters.includes(FilterCriteria.IMAGE):
        filterCallback = (character: CharacterItem) => hasImage(character.thumbnail.path);
        break;

      case filters.includes(FilterCriteria.DESCRIPTION):
        filterCallback = (character: CharacterItem) => hasDescription(character.description);
        break;

      default:
        return characters;
    }

    return characters.filter(filterCallback);
  }, [characters, filters]);

  const orderHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as FetchingOrder;

    setOnClearData(true);
    setOrder(value);
  };

  const handleClear = () => {
    if (searchInput !== '' || order !== FetchingOrder.NAME_AZ) {
      setOnClearData(true);

      if (searchInput !== '') {
        setSearchInput('');
        setSearchString('');
      }

      if (order !== FetchingOrder.NAME_AZ) {
        setOrder(FetchingOrder.NAME_AZ);
      }
    }

    if (filters.length > 0) {
      setFilters([]);
      setOnClearFilters(true);
    }
  };

  const handleClearChecks = () => {
    setOnClearFilters(false);
  };

  return (
    <>
      <Header classNameHeader='flex justify-center'>
        <SideDrawer elementsToFocus='input, button' classNameContainer='bg-black'>
          <CharactersControlPanel
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchTitle={'Search by name'}
            searchPlaceholder={'type a character name'}
            setOnClearData={setOnClearData}
            isEmptyData={!isFetching && filteredCharacters?.length === 0}
            emptyDataLiteral={EMPTY_DATA_LITERAL_LIST}
            orderTitle='Order results'
            onOrderChange={(event) => orderHandler(event)}
            orderOptions={Object.values(FetchingOrder)}
            orderLiterals={Object.values(HumanizedOrder)}
            filtersTitle='Filter results:'
            filtersOptions={Object.values(FilterCriteria)}
            filtersLiterals={Object.values(FilterCriteria)}
            setFilters={setFilters}
            setOnClearChecks={handleClearChecks}
            onClearChecks={onClearFilters}
          />
        </SideDrawer>
      </Header>
      <Container element={'main'}>
        <section
          className='relative z-0 flex flex-col items-center justify-around gap-2 min-h-52 md:min-h-72 mb-4 bg-black bg-hero-image bg-center bg-cover
        before:absolute before:content[""] before:h-full before:w-full  before:bg-gradient-to-b before:from-trans-0.75-black before:from-50% before:left-0 before:top-0 before:z-[-1]'
        >
          <Container element={'div'} className='flex flex-col gap-4'>
            <div className='w-full text-white text-center'>
              <h2 className='text-2xl md:text-3xl font-semibold text-white text-center uppercase mb-1'>
                Marvel Characters
              </h2>
              <p className='text-sm md:text-base text-center'>
                Get hooked on a hearty helping of heroes and villains from the humble House of
                Ideas!
              </p>
            </div>

            <CharactersControlPanel
              isDesktop
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchTitle={'Search by name'}
              searchPlaceholder={'type a character name'}
              setOnClearData={setOnClearData}
              isEmptyData={!isFetching && filteredCharacters?.length === 0}
              emptyDataLiteral={EMPTY_DATA_LITERAL_LIST}
              orderTitle='Order results'
              onOrderChange={(event) => orderHandler(event)}
              orderOptions={Object.values(FetchingOrder)}
              orderLiterals={Object.values(HumanizedOrder)}
              filtersTitle='Filter results:'
              filtersOptions={Object.values(FilterCriteria)}
              filtersLiterals={Object.values(FilterCriteria)}
              setFilters={setFilters}
              setOnClearChecks={handleClearChecks}
              onClearChecks={onClearFilters}
            />

            {listControlInfoItems && listControlInfoItems.length > 0 && (
              <ControlPanelInfo infoItems={listControlInfoItems} onClear={handleClear} />
            )}
          </Container>
        </section>
        {isError && <h2>Oooops, there&apos;s an unexpected error...try reloading again!</h2>}

        {isFetching && !isFetchingNextPage && (
          <RingLoader
            color={MARVEL_RED}
            size={LOADER_SIZE}
            className='mx-auto my-6'
            role='alert'
            aria-label='Characters List is loading'
            aria-busy='true'
            aria-live='polite'
          />
        )}

        <Container>
          {filteredCharacters?.length > 0 && <CharactersList characters={filteredCharacters} />}

          {!isFetching && filteredCharacters?.length === 0 && (
            <h3 className='text-center'>{EMPTY_DATA_LITERAL_LIST}</h3>
          )}
        </Container>

        {hasNextPage && (
          <div ref={ref}>
            <RingLoader
              color={MARVEL_RED}
              size={LOADER_SIZE}
              className='mx-auto my-6'
              role='alert'
              aria-label='Characters List is loading'
              aria-busy='true'
              aria-live='polite'
            />
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Characters;
