import { useState, useEffect } from 'react';
import useCharacters from '../../../services/useCharacters';
import CharactersList, { Character } from '../../molecules/CharactersList/CharactersList';
import { ShowMoreButton } from '../../atoms/ShowMoreButton/ShowMoreButton';

const Characters = () => {
  const [calls, setCalls] = useState(1);
  const { characters, isLoading } = useCharacters(calls);
  const [stack, setStack] = useState<Character[]>([]);

  useEffect(() => {
    setStack((stack) => [...stack, ...characters]);
  }, [characters]);

  const clicKHandler = () => {
    setCalls(calls + 1);
  };

  return (
    <>
      <h1>This is the Characters Page</h1>
      <CharactersList characters={stack} />
      {isLoading ? <h2>Loading...</h2> : <ShowMoreButton onClick={() => clicKHandler()} />}
    </>
  );
};

export default Characters;
