export type SearchStringState = string;

export type SearchStringAction =
  | { type: 'SET_SEARCH'; searchString: string }
  | { type: 'CLEAR_SEARCH' };

export const initialSearchStringState: SearchStringState = '';

const searchStringReducer = (state: SearchStringState, action: SearchStringAction) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.searchString;
    case 'CLEAR_SEARCH':
      return initialSearchStringState;
    default:
      return state;
  }
};

export default searchStringReducer;