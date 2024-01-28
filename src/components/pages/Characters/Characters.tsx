import { ChangeEvent, useEffect, useRef, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCharacters, useDebounce } from './hooks';
import { FetchingOrder, FilterCriteria } from './interfaces/characters';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import SelectorGroup from '@/components/molecules/SelectorGroup/SelectorGroup';
import CheckboxesList from '@/components/molecules/CheckboxesList/CheckboxesList';
import {
  LOADER_SIZE,
  MARVEL_RED,
  MAX_CHARACTERS_DEFAULT,
  MAX_CHARACTERS_OPTIM,
  MAX_CHARACTERS_TOP,
} from '@/utils/constants';
import Header from '@/components/organisms/Header';
import SearchGroup from '@/components/molecules/SearchGroup/SearchGroup';
import Footer from '@/components/organisms/Footer';
import Container from '@/components/organisms/Container';
import { RingLoader } from 'react-spinners';

const Characters = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchString, setSearchString] = useState<string>('');
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.NAME_AZ);
  const [onClearData, setOnClearData] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterCriteria[]>([]);
  const maxCharactersRef = useRef(MAX_CHARACTERS_DEFAULT);

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
    if (filters.includes(FilterCriteria.IMAGE) && filters.includes(FilterCriteria.DESCRIPTION)) {
      const regex = /image_not_available/g;

      maxCharactersRef.current = MAX_CHARACTERS_TOP;

      return characters.filter((character) => {
        return !regex.test(character.thumbnail.path) && character.description;
      });
    }

    if (filters.includes(FilterCriteria.IMAGE)) {
      maxCharactersRef.current = MAX_CHARACTERS_OPTIM;

      return characters.filter((character) => {
        const regex = /image_not_available/g;
        return !regex.test(character.thumbnail.path);
      });
    }

    if (filters.includes(FilterCriteria.DESCRIPTION)) {
      maxCharactersRef.current = MAX_CHARACTERS_OPTIM;

      return characters.filter((character) => {
        return character.description && character.description !== ' ';
      });
    }

    maxCharactersRef.current = MAX_CHARACTERS_DEFAULT;

    return characters;
  }, [characters, filters]);

  const orderHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as FetchingOrder;

    setOnClearData(true);
    setOrder(value);
  };

  const orderLiterals = [
    'By name A/Z',
    'By name Z/A',
    'By modification First/Last',
    'By modification Last/First',
  ];

  return (
    <>
      <Header>
        <section className='mx-6 md:mx-12 lg:mx-18 xl:mx-auto max-w-[1240px]'>
          <h1 className='text-3xl font-bold underline'>This is the Characters Page</h1>
          <SearchGroup
            title={'Search by name'}
            placeholderLiteral={'Type a character name'}
            setSearchInput={setSearchInput}
            setOnClearData={setOnClearData}
            isEmptyData={!isFetching && filteredCharacters?.length === 0}
            emptyDataLiteral={
              // eslint-disable-next-line quotes
              "Sorry, none of our characters' name matches your search! Try typing again"
            }
          />

          <SelectorGroup
            title='Order results:'
            onChange={(event) => orderHandler(event)}
            options={Object.values(FetchingOrder)}
            optionLiterals={orderLiterals}
          />
        </section>
        <section className='mx-6 md:mx-12 lg:mx-18 xl:mx-auto max-w-[1240px]'>
          <CheckboxesList
            title='Filter results:'
            options={Object.values(FilterCriteria)}
            optionLiterals={filterLiterals}
            setOptions={setFilters}
          />
        </section>
      </Header>

      <Container tag={'main'}>
        {isError && <h2>Oooops...try reloading again!</h2>}

        {isFetching && !isFetchingNextPage && (
          <RingLoader color={MARVEL_RED} size={LOADER_SIZE} className='mx-auto my-6' />
        )}

        {filteredCharacters?.length > 0 && <CharactersList characters={filteredCharacters} />}
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
