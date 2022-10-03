import useCharacters from '../../../services/useCharacters';
import CharactersList from '../../molecules/CharactersList/CharactersList';

const Characters = () => {
  const { characters, isLoading } = useCharacters();
  return (
    <>
      <h1>This is the Characters Page</h1>
      {isLoading && <h1>Loading...</h1>}
      {characters && <CharactersList characters={characters} />}
    </>
  );
};

export default Characters;
