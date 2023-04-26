import { ChangeEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCharacters } from './hooks';
import { FetchingOrder, FilterCriteria } from './interfaces/characters';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import SelectorGroup from '@/components/molecules/SelectorGroup/SelectorGroup';
import CheckboxesList from '@/components/molecules/CheckboxesList/CheckboxesList';

const Characters = () => {
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.NAME_AZ);
  const [filters, setFilters] = useState<FilterCriteria[]>([]);
  const { isLoading, isError, characters, fetchNextPage, hasNextPage, refetch } =
    useCharacters(order);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    refetch();
  }, [order]);

  const filterLiterals = ['With Image', 'With Description'];

  const filteredCharacters = (() => {
    return characters.filter((character) => {
      return character;
    });
  })();

  const orderHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as FetchingOrder;
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
      {isError && <h2>Oooops...try reloading again!</h2>}
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
      {filteredCharacters.length > 0 && <CharactersList characters={filteredCharacters} />}
      {isLoading && <h2>Loading...</h2>}
      {hasNextPage && <h2 ref={ref}>Loading more...</h2>}
    </>
  );
};

export default Characters;
