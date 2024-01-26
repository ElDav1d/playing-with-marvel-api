import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Characters from './components/pages/Characters/Characters';
import CharacterDetail from './components/pages/CharacterDetail/CharacterDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='relative'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Characters />} />
            <Route path='character/:id/:name' element={<CharacterDetail />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
