import { FilterCriteriaType } from '../interfaces/characters';

export type FiltersState = Record<FilterCriteriaType, boolean>;

export type FiltersAction =
  | { type: 'RETRIEVE_FILTERS'; filters: FiltersState }
  | { type: 'SET_FILTER'; filter: FilterCriteriaType; isChecked: boolean }
  | { type: 'CLEAR_FILTERS' };

const persistedState = sessionStorage.getItem('__characters__state__');

export const initialFiltersState: FiltersState = persistedState
  ? JSON.parse(persistedState).filters
  : {
      withImage: false,
      withDescription: false,
    };

const filtersReducer = (state: FiltersState, action: FiltersAction) => {
  switch (action.type) {
    case 'RETRIEVE_FILTERS':
      return {
        ...state,
        filters: action.filters,
      };
    case 'SET_FILTER':
      return { ...state, [action.filter]: action.isChecked };
    case 'CLEAR_FILTERS':
      return { ...initialFiltersState };
    default:
      return state;
  }
};

export default filtersReducer;
