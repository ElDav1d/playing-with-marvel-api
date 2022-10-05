import { useState } from 'react';
import useCharacters from '../../../services/useCharacters';
import CharactersList from '../../molecules/CharactersList/CharactersList';
import { ShowMoreButton } from '../../atoms/ShowMoreButton/ShowMoreButton';

const Characters = () => {
	const [calls, setCalls] = useState(1);
  const { characters, isLoading } = useCharacters(calls);
	const clicKHandler = (
	) => {
		setCalls(calls + 1);
	}

  return (
    <>
      <h1>This is the Characters Page</h1>
      {isLoading && <h1>Loading...</h1>}
      {characters && <CharactersList characters={characters} />}
      <ShowMoreButton onClick={() => clicKHandler()}/>
    </>
  );
};

export default Characters;
