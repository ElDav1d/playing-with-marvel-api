import { useContext } from 'react';
import { FiltersContext } from '../context';

const useFiltersContext = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }

  return context;
};

export default useFiltersContext;
