import { CharacterComicListItem } from '@/components/molecules/CharacterComicListItem';
import { ComicsSelectGroup } from '@/components/molecules/ComicsSelectGroup';

import {
  CHARACTER_COMICS_LOADING_LABEL_LITERAL,
  MAX_FETCH_CHARACTER_COMICS,
  NEXT_BUTTON_LITERAL,
  PREVIOUS_BUTTON_LITERAL,
} from '@/utils/constants';
import { Button, Loader } from 'eldav1d-marvel-ui';
import { ChangeEvent, useEffect, useState } from 'react';
import { useCharacterComics } from './hooks';
import { FetchingOrder, HumanizedOrder } from './interfaces/characterComics';

export interface ICharacterComicListProps {
  /**
   * The ID of the character.
   * @type {string}
   */
  characterId: string | undefined;
  /**
   * The name of the character.
   * @type {string}
   */
  characterName: string;
}

const CharacterComicList = ({ characterId, characterName }: ICharacterComicListProps) => {
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<FetchingOrder>(FetchingOrder.TITLE_AZ);
  const [onClearData, setOnClearData] = useState<boolean>(false);

  const {
    comics,
    totalComics,
    rangeInit,
    rangeEnd,
    isError,
    isLoading,
    isFirstPage,
    isLastPage,
    refetch,
  } = useCharacterComics({
    characterId,
    maxComics: MAX_FETCH_CHARACTER_COMICS,
    page,
    order,
    onClearData,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (onClearData) {
      setOnClearData(false);
    }
  }, [order]);

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const orderHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as FetchingOrder;

    setOnClearData(true);
    setOrder(value);
    setPage(0);
  };

  const orderLiterals = Object.values(HumanizedOrder);

  return (
    <>
      {isError && <h2>Ooops, try refreshing your browser</h2>}

      {comics && comics.length > 1 && (
        <ComicsSelectGroup
          classNameSelect='w-1/4'
          inputAriaLabel='Order comics by:'
          title='Order comics by:'
          onChange={(event) => orderHandler(event)}
          options={Object.values(FetchingOrder)}
          optionLiterals={orderLiterals}
        />
      )}

      {isLoading ? (
        <Loader loadingLabel={CHARACTER_COMICS_LOADING_LABEL_LITERAL} />
      ) : (
        comics &&
        comics.length > 0 && (
          <>
            <h3 className='mb-2'>
              Displaying {rangeInit} to {rangeEnd} from {totalComics} available comics
            </h3>

            <ul
              aria-label='List of comics for the character.'
              aria-live='polite'
              className='grid gap-3 grid-flow-row grid-cols-auto-min-max-120-auto md:grid-cols-auto-min-max-185-auto mb-4'
            >
              {comics.map(({ id, images, title, description }) => (
                <CharacterComicListItem
                  key={id}
                  id={id}
                  images={images}
                  title={title}
                  description={description}
                />
              ))}
            </ul>

            {!isFirstPage && <Button onClick={handlePrevPage}>{PREVIOUS_BUTTON_LITERAL}</Button>}
            {!isLastPage && <Button onClick={handleNextPage}>{NEXT_BUTTON_LITERAL}</Button>}
          </>
        )
      )}

      {comics?.length === 0 && <h3>{characterName} has no comics</h3>}
    </>
  );
};

export default CharacterComicList;
