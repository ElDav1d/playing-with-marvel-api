import { ChangeEvent, useEffect, useRef, useState, useMemo } from 'react';

import { useInView } from 'react-intersection-observer';
import { useCharacters, useDebounce } from './hooks';
import { FetchingOrder, FilterCriteria } from './interfaces/characters';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import SelectorGroup from '@/components/molecules/SelectorGroup/SelectorGroup';
import CheckboxesList from '@/components/molecules/CheckboxesList/CheckboxesList';
import {
  MAX_CHARACTERS_DEFAULT,
  MAX_CHARACTERS_OPTIM,
  MAX_CHARACTERS_TOP,
} from '@/utils/constants';
import SearchGroup from '@/components/molecules/SearchGroup/SearchGroup';

const Characters = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchString, setSearchString] = useState<string>('');
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.NAME_AZ);
  const [onClearData, setOnClearData] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterCriteria[]>([]);
  const maxCharactersRef = useRef(MAX_CHARACTERS_DEFAULT);

  const {
    isError,
    characters,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  } = useCharacters(maxCharactersRef.current, searchString, order, onClearData);

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
      refetch();
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
      <h1>This is the Characters Page</h1>

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

      <CheckboxesList
        title='Filter results:'
        options={Object.values(FilterCriteria)}
        optionLiterals={filterLiterals}
        setOptions={setFilters}
      />

      {isError && <h2>Oooops...try reloading again!</h2>}

      {isFetching && !isFetchingNextPage && <h2>Loading...</h2>}

      {filteredCharacters?.length > 0 && <CharactersList characters={filteredCharacters} />}
      {hasNextPage && <h2 ref={ref}>Loading more...</h2>}
    </>
  );
};

export default Characters;
