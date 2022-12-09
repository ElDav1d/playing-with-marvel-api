import { useContext, createContext, Ref } from 'react';

interface Context {
  refProp: Ref<HTMLLIElement> | null;
  counter: number | null;
  setCounter: React.Dispatch<React.SetStateAction<number>> | null;
}

const CharactersContext = createContext<Context>({
  refProp: null,
  counter: null,
  setCounter: null,
});

const useCharactersContext = () => {
  const context = useContext(CharactersContext);

  if (context === undefined) {
    throw new Error('useCharactersContext was used outside of its Provider!');
  }

  return context;
};

export { useCharactersContext };
export default CharactersContext;
