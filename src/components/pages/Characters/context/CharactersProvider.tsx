import { useEffect, useReducer } from 'react';
import CharactersContext, { combinedReducer, initialCombinedState } from './Characters';

export interface IFilterProviderProps {
  children: React.ReactNode;
}

const CharactersProvider = ({ children }: IFilterProviderProps) => {
  const [charactersContextState, charactersContextDispatch] = useReducer(
    combinedReducer,
    initialCombinedState,
  );

  useEffect(() => {
    localStorage.setItem('__characters__state__', JSON.stringify(charactersContextState));
  }, [charactersContextState]);

  const value = { charactersContextState, charactersContextDispatch };

  return <CharactersContext.Provider value={value}>{children}</CharactersContext.Provider>;
};

export default CharactersProvider;
