import { useCharacters } from './hooks';
import { useInView } from 'react-intersection-observer';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import { useEffect, useState } from 'react';

const Characters = () => {
  const { characters, isLoading, isError } = useCharacters();
  const [inMoreData, setInMoreData] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    setInMoreData(true);
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const fetchNextPage = () => {
    console.log('is Fetching');
  };

  return (
    <>
      <h1>This is the Characters Page</h1>
      {isError && <h2>Oooops...try reloading again!</h2>}
      <CharactersList characters={characters} />
      {isLoading && <h2>Loading...</h2>}
      {inMoreData && <h2 ref={ref}>Ref</h2>}
    </>
  );
};

export default Characters;
