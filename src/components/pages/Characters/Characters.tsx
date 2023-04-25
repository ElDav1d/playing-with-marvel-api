import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCharacters } from './hooks';
import { FetchingOrder } from './interfaces/characters';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';

const Characters = () => {
  const { isLoading, isError, characters, fetchNextPage, hasNextPage } = useCharacters(
    FetchingOrder.NAME_AZ,
  );

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <h1>This is the Characters Page</h1>
      {isError && <h2>Oooops...try reloading again!</h2>}
      {characters.length > 0 && <CharactersList characters={characters} />}
      {isLoading && <h2>Loading...</h2>}
      {hasNextPage && <h2 ref={ref}>Loading more...</h2>}
    </>
  );
};

export default Characters;
