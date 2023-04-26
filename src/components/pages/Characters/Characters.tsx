import { ChangeEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCharacters } from './hooks';
import { FetchingOrder } from './interfaces/characters';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import SelectorGroup from '@/components/molecules/SelectorGroup/SelectorGroup';

const Characters = () => {
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.NAME_AZ);
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

  const orderHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as FetchingOrder;
    setOrder(value);
  };

  return (
    <>
      <h1>This is the Characters Page</h1>
      {isError && <h2>Oooops...try reloading again!</h2>}
      <SelectorGroup
        title='Order results:'
        onChange={(event) => orderHandler(event)}
        options={Object.values(FetchingOrder)}
      />
      {characters.length > 0 && <CharactersList characters={characters} />}
      {isLoading && <h2>Loading...</h2>}
      {hasNextPage && <h2 ref={ref}>Loading more...</h2>}
    </>
  );
};

export default Characters;
