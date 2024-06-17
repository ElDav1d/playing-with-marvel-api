import { useCharacters, useFilteredCharacters } from './hooks';
import { CharacterListItem } from '@/components/molecules/CharacterListItem';
import { useCharactersContext } from '@/components/pages/Characters/hooks';
import { EMPTY_SEARCH_RESULTS_LITERAL } from '@/utils/constants';
import { Loader } from 'eldav1d-marvel-ui';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

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
          aria-label='characters list'
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
          <Loader loadingLabel={LOADING_LABEL} />
        </div>
      )}
    </>
  );
};

export default CharactersList;
