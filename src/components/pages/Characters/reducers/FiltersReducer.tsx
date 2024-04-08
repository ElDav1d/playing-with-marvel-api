import { FilterCriteriaType } from '../interfaces/characters';

export type FiltersState = Record<FilterCriteriaType, boolean>;

export type FiltersAction =
  | { type: 'SET_FILTER'; filter: FilterCriteriaType; isChecked: boolean }
  | { type: 'CLEAR_FILTERS' };

export const initialFiltersState: FiltersState = {
  withImage: false,
  withDescription: false,
};

const filtersReducer = (state: FiltersState, action: FiltersAction) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, [action.filter]: action.isChecked };
    case 'CLEAR_FILTERS':
      return { ...initialFiltersState };
    default:
      return state;
  }
};

export default filtersReducer;
