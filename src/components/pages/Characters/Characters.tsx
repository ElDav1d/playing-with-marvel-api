import { useState, useEffect, useRef } from 'react';
import { CharacterItem } from '@/interfaces/globals';
import { useCharactersEffect } from '@/services';
import { useIntersectionObserver, useDebounce } from '@/hooks';
import CharactersContext from './context';
import { CRITERIA, MAX_CHARACTERS } from '@/utils/constants';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import FilterSelector from '@/components/molecules/FilterSelector/FilterSelector';
import OrderSelector from '@/components/molecules/OrderSelector/OrderSelector';
import SearchCharacters from '@/components/molecules/SearchCharacters/SearchCharacters';

const Characters = () => {
  const [calls, setCalls] = useState(0);
  const [stackOrder, setOrder] = useState('name');
  const [searchString, setSearchString] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { characters, isLoading, hasMore, error } = useCharactersEffect({
    calls,
    stackOrder,
    searchString,
  });

  const [intersectionRef, entry] = useIntersectionObserver({
    threshold: 0.1,
  });

  const isVisible = !!entry?.isIntersecting;

  const [filters, setFilters] = useState<string[]>([]);
  const [stack, setStack] = useState<CharacterItem[]>([]);
  const [renderedItems, setRenderedItems] = useState<number>(MAX_CHARACTERS);

  const contextValue = {
    refProp: intersectionRef,
    counter: renderedItems,
    setCounter: setRenderedItems,
  };

  const searchInputRef = useRef<HTMLInputElement>(null);

  const clearOut = () => {
    setStack([]);
    setCalls(0);
  };

  useEffect(() => {
    setStack([...stack, ...characters]);
  }, [characters]);

  useEffect(() => {
    if (isVisible) setCalls(calls + 1);
  }, [isVisible]);

  useEffect(() => {
    if (filters.length > 0) setCalls(calls + 1);
  }, [filters]);

  useEffect(() => {
    if (renderedItems <= 5) setCalls(calls + 1);
  }, [renderedItems]);

  useEffect(() => {
    searchInputRef?.current?.focus();
  }, []);

  const orderChangeHandler = (event: { target: { value: string } }): void => {
    clearOut();
    setOrder(event.target.value);
  };

  const filterChangeHandler = (event: { target: { value: string } }): void => {
    const value = event.target.value;

    if (filters.includes(value)) {
      setFilters(() => [...filters].filter((item) => item !== value));
    } else {
      setFilters(() => [...filters].concat(value));
    }
  };

  const searchInputHandler = (event: { target: { value: string } }): void => {
    setSearchInput(event.target.value);
  };

  const searchQueryHandler = () => {
    clearOut();
    setSearchString(searchInput);
  };

  useDebounce(searchInput, 500, () => searchQueryHandler());

  return (
    <CharactersContext.Provider value={contextValue}>
      <>
        <h1>This is the Characters Page</h1>
        <SearchCharacters ref={searchInputRef} onChange={(event) => searchInputHandler(event)} />
        <OrderSelector onChange={(event) => orderChangeHandler(event)} order={CRITERIA.order} />
        <FilterSelector
          filters={CRITERIA.filters}
          onChange={(event) => filterChangeHandler(event)}
        />
        {error && <h2>Oooops...try reloading again!</h2>}
        <CharactersList isLoading={isLoading} filters={filters} characters={stack} />
        {!hasMore && !isLoading && <h2>No more results mate!</h2>}
      </>
    </CharactersContext.Provider>
  );
};

export default Characters;
