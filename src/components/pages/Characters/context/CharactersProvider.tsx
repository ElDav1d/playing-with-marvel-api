import { useReducer } from 'react';
import CharactersContext, { combinedReducer, initialCombinedState } from './Characters';

export interface IFilterProviderProps {
  children: React.ReactNode;
}

const CharactersProvider = ({ children }: IFilterProviderProps) => {
  const [charactersContextState, charactersContextDispatch] = useReducer(
    combinedReducer,
    initialCombinedState,
  );

  const value = { charactersContextState, charactersContextDispatch };

  return <CharactersContext.Provider value={value}>{children}</CharactersContext.Provider>;
};

export default CharactersProvider;
