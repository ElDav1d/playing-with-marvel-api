import { createContext } from 'react';
import { FiltersState, FiltersAction } from '../reducers/FiltersReducer';

type Dispatch = (action: FiltersAction) => void;

const FiltersContext = createContext<
  { filtersContextState: FiltersState; filtersContextDispatch: Dispatch } | undefined
>(undefined);

export default FiltersContext;
