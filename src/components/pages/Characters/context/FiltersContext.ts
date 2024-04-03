import { createContext } from 'react';
import { FilterCriteriaType } from '../interfaces/characters';

export interface IFiltersContextType {
  filters: Record<FilterCriteriaType, boolean>;
  setFilter: (filter: FilterCriteriaType, isChecked: boolean) => void;
  clearFilters: () => void;
}

const FiltersContext = createContext<IFiltersContextType | null>(null);

export default FiltersContext;
