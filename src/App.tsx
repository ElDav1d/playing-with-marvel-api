import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Characters from './components/pages/Characters/Characters';
import Character from './components/pages/CharacterDetail/CharacterDetail';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Characters />} />
          <Route path='character/:id/:name' element={<Character />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
