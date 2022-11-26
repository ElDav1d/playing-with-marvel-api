import { useState, useEffect, SetStateAction } from 'react';
import useCharacters from '@/services/useCharacters';
import { CharacterItem } from '@/interfaces/globals';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import { ShowMoreButton } from '@/components/atoms/ShowMoreButton/ShowMoreButton';
import { OrderSelector } from '@/components/atoms/OrderSelector/OrderSelector';

const Characters = () => {
  const [calls, setCalls] = useState(1);
  const [stackOrder, setOrder] = useState('name');
  const { characters, isLoading, error } = useCharacters({ calls, stackOrder });
  const [stack, setStack] = useState<CharacterItem[]>([]);

  useEffect(() => {
    setStack((stack) => [...stack, ...characters]);
  }, [characters]);

  const clicKHandler = () => {
    setCalls(calls + 1);
  };

  const changeHandler = (event: { target: { value: SetStateAction<string> } }) => {
    setStack([]);
    setOrder(event.target.value);
  };

  return (
    <>
      <h1>This is the Characters Page</h1>
      <OrderSelector
        onChange={(event: { target: { value: SetStateAction<string> } }) => changeHandler(event)}
      />
      <CharactersList characters={stack} />
      {isLoading ? <h2>Loading...</h2> : <ShowMoreButton disabled={error} onClick={() => clicKHandler()} />}
      {error && <h2>Oooops...try reloading again!</h2>}
    </>
  );
};

export default Characters;
