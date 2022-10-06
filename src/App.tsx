import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Characters from './components/pages/Characters/Characters';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Characters />,
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
