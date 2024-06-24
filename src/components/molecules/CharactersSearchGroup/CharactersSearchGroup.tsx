import { InputText, FormGroupContainer } from 'eldav1d-marvel-ui';
import { ChangeEvent, useEffect, useState } from 'react';
import { useCharactersContext, useDebounce } from '@/components/pages/Characters/hooks';
import {
  DEBOUNCE_DELAY,
  EMPTY_SEARCH_RESULTS_LITERAL,
  SEARCH_PLACEHOLDER,
  SEARCH_TITLE,
} from '@/utils/constants';
import { useCharacters } from '@/components/organisms/CharactersList/hooks';

/**
 * UI group for search input .
 */

const CharactersSearchGroup = () => {
  const { charactersContextState, charactersContextDispatch } = useCharactersContext();

  const [searchInput, setSearchInput] = useState<string>(charactersContextState.searchString);
  const [searchString, setSearchString] = useState<string>(charactersContextState.searchString);

  const { characters, isFetching } = useCharacters();

  useDebounce(searchInput, DEBOUNCE_DELAY, () => setSearchString(searchInput));

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    charactersContextDispatch({ type: 'SET_SEARCH', searchString });
  }, [searchString]);

  useEffect(() => {
    setSearchInput(charactersContextState.searchString);
  }, [charactersContextState.searchString]);

  return (
    <FormGroupContainer title={SEARCH_TITLE} classNameFieldset='text-white grow'>
      <InputText
        aria-label='search by name input'
        className='w-full'
        onChange={handleSearch}
        placeholder={SEARCH_PLACEHOLDER}
        value={searchInput}
      />
      {!isFetching && characters.length === 0 && (
        <h3 aria-live='assertive' className='md:sr-only'>
          {EMPTY_SEARCH_RESULTS_LITERAL}
        </h3>
      )}
    </FormGroupContainer>
  );
};

export default CharactersSearchGroup;
