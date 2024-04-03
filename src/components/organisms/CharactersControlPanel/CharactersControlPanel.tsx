import { CharactersCheckboxesList } from '@/components/molecules/CharactersCheckboxesList';
import { SearchGroup } from '@/components/molecules/SearchGroup';
import { SelectGroup } from '@/components/molecules/SelectGroup';
import {
  FetchingOrder,
  FilterCriteria,
  HumanizedOrder,
} from '@/components/pages/Characters/interfaces/characters';
import { EMPTY_SEARCH_RESULTS_LITERAL } from '@/utils/constants';
import { ChangeEvent } from 'react';

/**
 * Represents a control panel for managing characters.
 * @interface
 */
export interface ICharactersControlPanel {
  /**
   * @property {boolean}
   * Indicates viewport type (desktop or not).
   */
  isDesktop?: boolean;
  /**
   * @property {string}
   * The current value of the search input.
   */
  searchInput: string;
  /**
   * Sets the search input value.
   * @param arg - The new value of the search input.
   */
  setSearchInput: (arg: string) => void;
  /**
   * Sets the state to clear data.
   * @param arg - Indicates whether data should be cleared.
   */
  setOnClearData: (arg: boolean) => void;
  /**
   * @property {boolean}
   * Indicates whether the data is empty.
   */
  onEmptyData: boolean;
  /**
   * Handles changes in ordering.
   * @param arg - Event representing the change in ordering.
   */
  onOrderChange: (arg: ChangeEvent<HTMLSelectElement>) => void;
}

const CharactersControlPanel = ({
  isDesktop,
  searchInput,
  setSearchInput,
  setOnClearData,
  onEmptyData,
  onOrderChange,
}: ICharactersControlPanel) => {
  const SEARCH_TITLE = 'Search by name';
  const SEARCH_PLACEHOLDER = 'type a character name';
  const ORDER_TITLE = 'Order results';
  const FILTERS_TITLE = 'Filter results:';

  const getStyles = () =>
    `${isDesktop ? 'hidden md:flex justify-center flex-wrap' : 'flex flex-col'}`;

  const getLabels = () =>
    isDesktop ? 'Desktop Characters List Control Panel' : 'Mobile Characters List Control Panel';

  return (
    <form className={`focus-within gap-4 ${getStyles()}`} aria-label={getLabels()}>
      <SearchGroup
        classNameFieldset='text-white grow'
        classNameInput='w-full'
        title={SEARCH_TITLE}
        placeholderLiteral={SEARCH_PLACEHOLDER}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setOnClearData={setOnClearData}
        onEmptyData={onEmptyData}
        emptyDataLiteral={EMPTY_SEARCH_RESULTS_LITERAL}
      />
      <SelectGroup
        classNameFieldset='text-white grow'
        classNameSelect='w-full'
        title={ORDER_TITLE}
        onChange={onOrderChange}
        options={Object.values(FetchingOrder)}
        optionLiterals={Object.values(HumanizedOrder)}
      />
      <CharactersCheckboxesList
        classNameFieldset='text-white w-full lg:w-auto'
        title={FILTERS_TITLE}
        options={Object.values(FilterCriteria)}
        optionLiterals={Object.values(FilterCriteria)}
      />
    </form>
  );
};

export default CharactersControlPanel;
