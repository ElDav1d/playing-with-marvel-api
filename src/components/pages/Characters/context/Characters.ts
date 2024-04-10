import { createContext } from 'react';
import combineReducers from 'react-combine-reducers';
import filtersReducer, {
  FiltersState,
  FiltersAction,
  initialFiltersState,
} from '../reducers/FiltersReducer';
import orderReducer, {
  IOrderState,
  IOrderAction,
  initialOrderState,
} from '../reducers/OrderReducer';

type Action = FiltersAction | IOrderAction;

interface IState {
  filters: FiltersState;
  order: IOrderState;
}

type CombinedReducer = (state: IState, action: Action) => IState;

type Dispatch = (action: Action) => void;

export const [combinedReducer, initialCombinedState] = combineReducers<CombinedReducer>({
  filters: [filtersReducer, initialFiltersState],
  order: [orderReducer, initialOrderState],
});

const CharactersContext = createContext<
  { charactersContextState: IState; charactersContextDispatch: Dispatch } | undefined
>(undefined);

export default CharactersContext;
