import CharactersList from './components/pages/CharactersList/CharactersList'
import { mockCharacters } from './components/pages/CharactersList/mocks'
import './App.css'

function App() {
  return (
    <div className='App'>
      <CharactersList characters={mockCharacters} />
    </div>
  )
}

export default App
