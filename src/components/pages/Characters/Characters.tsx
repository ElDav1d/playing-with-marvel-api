import { useState, useEffect } from 'react';
import { CharacterItem } from '@/interfaces/globals';
import { useCharacters } from '@/services';
import { useIntersectionObserver } from '@/components/hooks';
import CharactersContext from './context';
import { CRITERIA } from '@/utils/constants';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import FilterSelector from '@/components/organisms/FilterSelector/FilterSelector';
import OrderSelector from '@/components/organisms/OrderSelector/OrderSelector';

const Characters = () => {
  const [intersectionRef, entry] = useIntersectionObserver({
    threshold: 0.05,
  });

  const [calls, setCalls] = useState(1);
  const [stackOrder, setOrder] = useState('name');

  const { characters, isLoading, error } = useCharacters({ calls, stackOrder });

  const [filters, setFilters] = useState<string[]>([]);
  const [stack, setStack] = useState<CharacterItem[]>([]);
  const [renderedItems, setRenderedItems] = useState<number>(0);

  const isVisible = !!entry?.isIntersecting;

  const contextValue = {
    refProp: intersectionRef,
    counter: renderedItems,
    setCounter: setRenderedItems,
  };

  useEffect(() => {
    setStack((stack) => [...stack, ...characters]);
  }, [characters]);

  useEffect(() => {
    if (isVisible) setCalls(calls + 1);
  }, [isVisible, filters]);

  useEffect(() => {
    if (renderedItems < 5) setCalls(calls + 1);
  }, [renderedItems]);

  const orderChangeHandler = (event: { target: { value: string } }) => {
    setStack([]);
    setCalls(0);
    setOrder(event.target.value);
  };

  const filterChangeHandler = (event: { target: { value: string } }) => {
    const value = event.target.value;

    if (filters.includes(value)) {
      setFilters(() => [...filters].filter((item) => item !== value));
    } else {
      setFilters(() => [...filters].concat(value));
    }
  };

  return (
    <CharactersContext.Provider value={contextValue}>
      <>
        <h1>This is the Characters Page</h1>
        <OrderSelector onChange={(event) => orderChangeHandler(event)} order={CRITERIA.order} />
        <FilterSelector
          filters={CRITERIA.filters}
          onChange={(event) => filterChangeHandler(event)}
        />
        <CharactersList isLoading={isLoading} filters={filters} characters={stack} />
        {error && <h2>Oooops...try reloading again!</h2>}
      </>
    </CharactersContext.Provider>
  );
};

export default Characters;
