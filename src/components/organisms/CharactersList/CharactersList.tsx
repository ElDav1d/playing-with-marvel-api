import { useFilteredCharacters } from './hooks';
import { CharacterListItem } from '@/components/molecules/CharacterListItem';
import { useCharacters, useCharactersContext } from '@/components/pages/Characters/hooks';
import { EMPTY_SEARCH_RESULTS_LITERAL, LOADER_SIZE, MARVEL_RED } from '@/utils/constants';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { RingLoader } from 'react-spinners';

const CharactersList = () => {
  const ERROR_MESSAGE = 'Oooops...unexpected error!! Try reloading again';
  const LOADING_LABEL = 'Characters List is loading';

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const { charactersContextState } = useCharactersContext();

  const { characters, isError, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useCharacters();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const filteredCharacters = useFilteredCharacters(characters, charactersContextState.filters);

  return (
    <>
      {isError && <h2>{ERROR_MESSAGE}</h2>}

      {!isError && !isLoading && filteredCharacters?.length === 0 && (
        <h3 className='text-center'>{EMPTY_SEARCH_RESULTS_LITERAL}</h3>
      )}

      {filteredCharacters?.length > 0 && (
        <ul
          aria-live='polite'
          className='grid gap-3 grid-flow-row grid-cols-auto-min-max-120-auto md:grid-cols-auto-min-max-185-auto'
        >
          {filteredCharacters.map(({ id, name, thumbnail, description }) => (
            <CharacterListItem
              key={id}
              id={id}
              name={name}
              thumbnail={thumbnail}
              description={description}
            />
          ))}
        </ul>
      )}

      {(isLoading || hasNextPage) && (
        <div ref={ref}>
          <RingLoader
            color={MARVEL_RED}
            size={LOADER_SIZE}
            className='mx-auto my-6'
            role='alert'
            aria-label={LOADING_LABEL}
            aria-busy='true'
            aria-live='polite'
          />
        </div>
      )}
    </>
  );
};

export default CharactersList;
