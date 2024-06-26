import { createContext } from 'react';
import combineReducers from 'react-combine-reducers';
import filtersReducer, {
  FiltersState,
  FiltersAction,
  initialFiltersState,
} from '../reducers/FiltersReducer';
import orderReducer, { OrderState, OrderAction, initialOrderState } from '../reducers/OrderReducer';
import searchStringReducer, {
  SearchStringAction,
  SearchStringState,
  initialSearchStringState,
} from '../reducers/SearchStringReducer';

type Action = SearchStringAction | FiltersAction | OrderAction;

interface IState {
  searchString: SearchStringState;
  filters: FiltersState;
  order: OrderState;
}

type CombinedReducer = (state: IState, action: Action) => IState;

type Dispatch = (action: Action) => void;

export const [combinedReducer, initialCombinedState] = combineReducers<CombinedReducer>({
  searchString: [searchStringReducer, initialSearchStringState],
  filters: [filtersReducer, initialFiltersState],
  order: [orderReducer, initialOrderState],
});

const CharactersContext = createContext<
  { charactersContextState: IState; charactersContextDispatch: Dispatch } | undefined
>(undefined);

export default CharactersContext;
