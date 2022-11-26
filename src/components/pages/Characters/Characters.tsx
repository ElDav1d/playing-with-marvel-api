import { useState, useEffect, SetStateAction } from 'react';
import useCharacters from '@/services/useCharacters';
import { CharacterItem } from '@/interfaces/globals';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import { ShowMoreButton } from '@/components/atoms/ShowMoreButton/ShowMoreButton';
import { OrderSelector } from '@/components/atoms/OrderSelector/OrderSelector';

const Characters = () => {
  const [calls, setCalls] = useState(1);
  const [withDescription, setWithDescription] = useState(false);
  const [stackOrder, setOrder] = useState('name');
  const { characters, isLoading, error } = useCharacters({ calls, stackOrder });
  const [stack, setStack] = useState<CharacterItem[]>([]);

  useEffect(() => {
    if (withDescription) {
      const filteredCharacters = [...characters].filter((item) => item.description !== '');
      setStack(() => [...filteredCharacters]);
    } else {
      setStack((stack) => [...stack, ...characters]);
    }
  }, [characters, withDescription]);

  const clicKHandler = () => {
    setCalls(calls + 1);
  };

  const orderChangeHandler = (event: { target: { value: SetStateAction<string> } }) => {
    setStack([]);
    setOrder(event.target.value);
  };

  const handleOnchange = () => {
    setWithDescription(!withDescription);
  };

  return (
    <>
      <h1>This is the Characters Page</h1>
      <OrderSelector
        onChange={(event: { target: { value: SetStateAction<string> } }) =>
          orderChangeHandler(event)
        }
      />
      <fieldset>
        <legend>Filter results:</legend>
        <div>
          <input
            type='checkbox'
            id='descriptionFilter'
            name='descriptionFilter'
            checked={withDescription}
            onChange={handleOnchange}
          />
          <label htmlFor='descriptionFilter'>With Description</label>
        </div>
      </fieldset>

      <CharactersList characters={stack} />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ShowMoreButton disabled={error} onClick={() => clicKHandler()} />
      )}
      {error && <h2>Oooops...try reloading again!</h2>}
    </>
  );
};

export default Characters;
