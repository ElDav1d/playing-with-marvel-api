import Input from '@/components/atoms/Input';
import { ChangeEvent, useEffect, useState } from 'react';
import FormGroupContainer from '../FormGroupContainer';
import { useCharactersContext, useDebounce } from '@/components/pages/Characters/hooks';
import { EMPTY_SEARCH_RESULTS_LITERAL } from '@/utils/constants';
import { useCharacters } from '@/components/organisms/CharactersList/hooks';

/**
 * UI group for search input .
 */

const CharactersSearchGroup = () => {
  const SEARCH_PLACEHOLDER = 'type a character name';
  const SEARCH_TITLE = 'Search by name';

  const { charactersContextState, charactersContextDispatch } = useCharactersContext();

  const [searchInput, setSearchInput] = useState<string>(charactersContextState.searchString);
  const [searchString, setSearchString] = useState<string>(charactersContextState.searchString);

  const { characters, isFetching } = useCharacters();

  useDebounce(searchInput, 500, () => setSearchString(searchInput));

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    charactersContextDispatch({ type: 'SET_SEARCH', searchString });
  }, [searchString]);

  return (
    <FormGroupContainer title={SEARCH_TITLE} classNameFieldset='text-white grow'>
      <Input
        aria-label='search by name input'
        className='w-full'
        type='text'
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
