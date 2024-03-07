import { ChangeEvent, useEffect, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCharacters, useDebounce, useListControlInfo } from './hooks';
import {
  CharacterItem,
  FetchingOrder,
  FilterCriteria,
  FilterCriteriaType,
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
import { CharactersHeroSection } from '@/components/organisms/CharactersHeroSection';

const Characters = () => {
  const SEARCH_TITLE = 'Search by name';
  const SEARCH_PLACEHOLDER = 'type a character name';
  const ORDER_TITLE = 'Order results';
  const FILTERS_TITLE = 'Filter results:';
  const ERROR_MESSAGE = 'Oooops...unexpected error!! Try reloading again';
  const LOADING_LABEL = 'Characters List is loading';

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchString, setSearchString] = useState<string>('');
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.NAME_AZ);
  const [onClearData, setOnClearData] = useState(false);
  const [filters, setFilters] = useState<FilterCriteriaType[]>([]);
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

  const hasEmptyData = (): boolean => {
    return !isFetching && filteredCharacters?.length === 0;
  };

  return (
    <>
      <Header>
        <SideDrawer elementsToFocus='input, button' classNameContainer='bg-black'>
          <CharactersControlPanel
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchTitle={SEARCH_TITLE}
            searchPlaceholder={SEARCH_PLACEHOLDER}
            setOnClearData={setOnClearData}
            onEmptyData={hasEmptyData()}
            emptyDataLiteral={EMPTY_DATA_LITERAL_LIST}
            orderTitle={ORDER_TITLE}
            onOrderChange={(event) => orderHandler(event)}
            orderOptions={Object.values(FetchingOrder)}
            orderLiterals={Object.values(HumanizedOrder)}
            filtersTitle={FILTERS_TITLE}
            filtersOptions={Object.values(FilterCriteria)}
            filtersLiterals={Object.values(FilterCriteria)}
            setFilters={setFilters}
            setOnClearChecks={handleClearChecks}
            onClearChecks={onClearFilters}
          />
        </SideDrawer>
      </Header>
      <Container element={'main'}>
        <CharactersHeroSection>
          <CharactersControlPanel
            isDesktop
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchTitle={SEARCH_TITLE}
            searchPlaceholder={SEARCH_PLACEHOLDER}
            setOnClearData={setOnClearData}
            onEmptyData={hasEmptyData()}
            emptyDataLiteral={EMPTY_DATA_LITERAL_LIST}
            orderTitle={ORDER_TITLE}
            onOrderChange={(event) => orderHandler(event)}
            orderOptions={Object.values(FetchingOrder)}
            orderLiterals={Object.values(HumanizedOrder)}
            filtersTitle={FILTERS_TITLE}
            filtersOptions={Object.values(FilterCriteria)}
            filtersLiterals={Object.values(FilterCriteria)}
            setFilters={setFilters}
            setOnClearChecks={handleClearChecks}
            onClearChecks={onClearFilters}
          />

          {listControlInfoItems && listControlInfoItems.length > 0 && (
            <ControlPanelInfo infoItems={listControlInfoItems} onClear={handleClear} />
          )}
        </CharactersHeroSection>

        {isError && <h2>{ERROR_MESSAGE}</h2>}

        {isFetching && !isFetchingNextPage && (
          <RingLoader
            color={MARVEL_RED}
            size={LOADER_SIZE}
            className='mx-auto my-6'
            role='alert'
            aria-label={LOADING_LABEL}
            aria-busy='true'
            aria-live='polite'
          />
        )}

        <Container>
          {filteredCharacters?.length > 0 && <CharactersList characters={filteredCharacters} />}

          {hasEmptyData() && <h3 className='text-center'>{EMPTY_DATA_LITERAL_LIST}</h3>}
        </Container>

        {hasNextPage && (
          <div ref={ref}>
            <RingLoader
              color={MARVEL_RED}
              size={LOADER_SIZE}
              className='mx-auto my-6'
              role='alert'
              aria-label={LOADING_LABEL}
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
