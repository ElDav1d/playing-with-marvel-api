import { ChangeEvent, useEffect, useRef, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCharacters, useDebounce } from './hooks';
import { CharacterItem, FetchingOrder, FilterCriteria } from './interfaces/characters';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import SelectorGroup from '@/components/molecules/SelectorGroup/SelectorGroup';
import CheckboxesList from '@/components/molecules/CheckboxesList/CheckboxesList';
import {
  LOADER_SIZE,
  MARVEL_RED,
  MAX_FETCH_CHARACTERS_DEFAULT,
  MAX_FETCH_CHARACTERS_OPTIM,
  MAX_FETCH_CHARACTERS_TOP,
  REGEX_IMAGE_PATH,
} from '@/utils/constants';
import Header from '@/components/organisms/Header';
import SearchGroup from '@/components/molecules/SearchGroup/SearchGroup';
import Footer from '@/components/organisms/Footer';
import Container from '@/components/organisms/Container';
import { RingLoader } from 'react-spinners';
import SideDrawer from '@/components/organisms/SideDrawer';

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
          <SearchGroup
            className='text-white'
            title={'Search by name'}
            placeholderLiteral={'Type a character name'}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setOnClearData={setOnClearData}
            isEmptyData={!isFetching && filteredCharacters?.length === 0}
            emptyDataLiteral={
              // eslint-disable-next-line quotes
              "Sorry, none of our characters' name matches your search! Try typing again"
            }
          />
          <SelectorGroup
            className='text-white'
            title='Order results'
            onChange={(event) => orderHandler(event)}
            options={Object.values(FetchingOrder)}
            optionLiterals={orderLiterals}
          />

          <CheckboxesList
            classNameFieldset='text-white'
            title='Filter results:'
            options={Object.values(FilterCriteria)}
            optionLiterals={filterLiterals}
            setOptions={setFilters}
          />
        </SideDrawer>
      </Header>
      <Container element={'main'}>
        <section
          className='relative z-0 bg-black py-5 mb-4 bg-hero-image bg-center bg-cover
        before:absolute  before:content[""] before:h-full before:w-full  before:bg-gradient-to-b before:from-trans-0.75-black before:from-50% before:left-0 before:top-0 before:z-[-1]'
        >
          <Container element={'div'}>
            <div className='text-white text-center mb-2'>
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

            <SearchGroup
              className='text-white hidden md:block'
              title={'Search by name'}
              placeholderLiteral={'Type a character name'}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setOnClearData={setOnClearData}
              isEmptyData={!isFetching && filteredCharacters?.length === 0}
              emptyDataLiteral={
                // eslint-disable-next-line quotes
                "Sorry, none of our characters' name matches your search! Try typing again"
              }
            />
            <SelectorGroup
              className='text-white hidden md:block'
              title='Order results'
              onChange={(event) => orderHandler(event)}
              options={Object.values(FetchingOrder)}
              optionLiterals={orderLiterals}
            />
          </Container>

          <Container element={'div'} className='text-white hidden md:block'>
            <CheckboxesList
              title='Filter results:'
              options={Object.values(FilterCriteria)}
              optionLiterals={filterLiterals}
              setOptions={setFilters}
            />
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
