import { useCharacters } from './hooks';
import CharactersList from '@/components/organisms/CharactersList/CharactersList';

const Characters = () => {
  const { characters, isLoading, isError } = useCharacters();

  return (
    <>
      <h1>This is the Characters Page</h1>
      {isError && <h2>Oooops...try reloading again!</h2>}
      <CharactersList isLoading={isLoading} characters={characters} />
      {/* {!hasMore && !isLoading && <h2>No more results mate!</h2>} */}
    </>
  );
};

export default Characters;
