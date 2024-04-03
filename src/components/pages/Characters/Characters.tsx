import { ChangeEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCharacters, useDebounce } from './hooks';
import { FetchingOrder } from './interfaces/characters';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import {
  EMPTY_SEARCH_RESULTS_LITERAL,
  LOADER_SIZE,
  MARVEL_RED,
  MAX_FETCH_CHARACTERS,
  MEDIA_BREAKPOINTS,
} from '@/utils/constants';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Container from '@/components/organisms/Container';
import { RingLoader } from 'react-spinners';
import SideDrawer from '@/components/organisms/SideDrawer';
import CharactersControlPanel from '@/components/organisms/CharactersControlPanel';
import { CharactersHeroSection } from '@/components/organisms/CharactersHeroSection';
import { useMediaQuery } from '@/hooks';
import { FiltersProvider } from './context';
import { CharactersControlPanelInfo } from '@/components/molecules/CharactersControlPanelInfo';

const Characters = () => {
  const ERROR_MESSAGE = 'Oooops...unexpected error!! Try reloading again';
  const LOADING_LABEL = 'Characters List is loading';

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchString, setSearchString] = useState<string>('');
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.NAME_AZ);
  const [onClearData, setOnClearData] = useState(false);

  const { isError, characters, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useCharacters({ maxCharacters: MAX_FETCH_CHARACTERS, searchString, order, onClearData });

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
  };

  const hasEmptyData = (): boolean => {
    return !isFetching && characters?.length === 0;
  };

  const isDesktop = useMediaQuery(`(min-width: ${MEDIA_BREAKPOINTS.MD}px)`);

  const controlPanelProps = {
    searchInput,
    setSearchInput,
    setOnClearData,
    onEmptyData: hasEmptyData(),
    onOrderChange: (event: ChangeEvent<HTMLSelectElement>) => orderHandler(event),
  };

  return (
    <FiltersProvider>
      <Header>
        {!isDesktop && (
          <SideDrawer elementsToFocus='input, button' classNameContainer='bg-black'>
            <CharactersControlPanel {...controlPanelProps} />
          </SideDrawer>
        )}
      </Header>
      <Container element={'main'} aria-label='characters page main content'>
        <CharactersHeroSection>
          {isDesktop && <CharactersControlPanel isDesktop {...controlPanelProps} />}

          <CharactersControlPanelInfo
            searchInput={searchInput}
            order={order}
            onClear={handleClear}
          />
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
          {hasEmptyData() ? (
            <h3 className='text-center'>{EMPTY_SEARCH_RESULTS_LITERAL}</h3>
          ) : (
            <CharactersList characters={characters} />
          )}
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
    </FiltersProvider>
  );
};

export default Characters;
