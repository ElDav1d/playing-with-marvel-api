export type SearchStringState = string;

export type SearchStringAction =
  | { type: 'SET_SEARCH_STRING'; searchString: string }
  | { type: 'CLEAR_SEARCH_STRING' };

export const initialSearchStringState: SearchStringState = '';

const searchStringReducer = (state: SearchStringState, action: SearchStringAction) => {
  switch (action.type) {
    case 'SET_SEARCH_STRING':
      return action.searchString;
    case 'CLEAR_SEARCH_STRING':
      return initialSearchStringState;
    default:
      return state;
  }
};

export default searchStringReducer;
