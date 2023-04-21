import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CharactersList from '@/components/organisms/CharactersList/CharactersList';
import { useCharacters } from './hooks/useCharacters';

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
