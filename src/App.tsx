import useCharacters from './services/useCharacters';
import CharactersList from './components/pages/CharactersList/CharactersList';

function App() {
	const {characters, isLoading} = useCharacters();
  return (
    <div className='App'>
      {isLoading && <h1>Loading...</h1>}
      {characters && <CharactersList characters={characters} />}
    </div>
  );
}

export default App;
