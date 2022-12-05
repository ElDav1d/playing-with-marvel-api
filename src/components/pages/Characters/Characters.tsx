import { useState, useEffect } from 'react';
import { useCharacters } from '@/services';
import { CharacterItem } from '@/interfaces/globals';
import { CRITERIA } from '@/utils/constants';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import ShowMoreButton from '@/components/atoms/ShowMoreButton/ShowMoreButton';
import FilterSelector from '@/components/organisms/FilterSelector/FilterSelector';
import OrderSelector from '@/components/organisms/OrderSelector/OrderSelector';

const Characters = () => {
  const [calls, setCalls] = useState(1);
  const [filters, setFilters] = useState<string[]>([]);
  const [stackOrder, setOrder] = useState('name');
  const [stack, setStack] = useState<CharacterItem[]>([]);
  const { characters, isLoading, error } = useCharacters({ calls, stackOrder });

  useEffect(() => {
    setStack((stack) => [...stack, ...characters]);
  }, [characters]);

  const clickHandler = () => {
    setCalls(calls + 1);
  };

  const orderChangeHandler = (event: { target: { value: string } }) => {
    setStack([]);
    setOrder(event.target.value);
  };

  const filterChangeHandler = (event: { target: { value: string } }) => {
    const value = event.target.value;

    if (filters.includes(value)) {
      setFilters(() => filters.filter((item) => item !== value));
    } else {
      setFilters(() => [...filters].concat(value));
    }
  };

  return (
    <>
      <h1>This is the Characters Page</h1>
      <OrderSelector onChange={(event) => orderChangeHandler(event)} order={CRITERIA.order} />
      <FilterSelector filters={CRITERIA.filters} onChange={(event) => filterChangeHandler(event)} />
      <CharactersList filters={filters} characters={stack} />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ShowMoreButton disabled={error} onClick={() => clickHandler()} />
      )}
      {error && <h2>Oooops...try reloading again!</h2>}
    </>
  );
};

export default Characters;
