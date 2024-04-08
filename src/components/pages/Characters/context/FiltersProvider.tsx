import { useReducer } from 'react';
import FiltersContext from './FiltersContext';
import { filtersReducer } from '../reducers';
import { initialFiltersState } from '../reducers/FiltersReducer';
import { FilterCriteriaType } from '../interfaces/characters';

export interface IFilterProviderProps {
  children: React.ReactNode;
}

const FiltersProvider = ({ children }: IFilterProviderProps) => {
  const [filtersContextState, filtersContextDispatch] = useReducer(
    filtersReducer,
    initialFiltersState,
  );

  const value = { filtersContextState, filtersContextDispatch };

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

export default FiltersProvider;
