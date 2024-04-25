import { useContext } from 'react';
import CharactersContext from '../context/Characters';

const useCharactersContext = () => {
  const context = useContext(CharactersContext);

  if (!context) {
    throw new Error('useCharactersContext must be used within a CharactersProvider');
  }

  return context;
};

export default useCharactersContext;
