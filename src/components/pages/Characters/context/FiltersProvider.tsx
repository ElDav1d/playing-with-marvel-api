import { useState } from 'react';
import { FilterCriteriaType } from '../interfaces/characters';
import FiltersContext from './FiltersContext';

export interface IFilterProviderProps {
  children: React.ReactNode;
}

const initialFiltersState: Record<FilterCriteriaType, boolean> = {
  withImage: false,
  withDescription: false,
};

const FiltersProvider = ({ children }: IFilterProviderProps) => {
  const [filters, setFiltersState] = useState(initialFiltersState);

  const setFilter = (filter: FilterCriteriaType, isChecked: boolean) => {
    setFiltersState((prevFilters) => ({ ...prevFilters, [filter]: isChecked }));
  };

  const clearFilters = () => {
    setFiltersState({
      ...initialFiltersState,
    });
  };

  const value = { filters, setFilter, clearFilters };

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

export default FiltersProvider;
