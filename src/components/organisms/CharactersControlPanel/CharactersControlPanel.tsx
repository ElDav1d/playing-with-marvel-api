import { CheckboxesList } from '@/components/molecules/CheckboxesList';
import SearchGroup from '@/components/molecules/SearchGroup';
import SelectGroup from '@/components/molecules/SelectGroup';
import { FilterCriteriaType } from '@/components/pages/Characters/interfaces/characters';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

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
   * @property {string}
   * Title for the search form group.
   */
  searchTitle: string;
  /**
   * @property {string}
   * Placeholder text for the search input.
   */
  searchPlaceholder: string;
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
   * @property {string}
   * Literal for the user message when data is empty.
   */
  emptyDataLiteral?: string;
  /**
   * @property {string}
   * Title for the ordering form group.
   */
  orderTitle: string;
  /**
   * Handles changes in ordering.
   * @param arg - Event representing the change in ordering.
   */
  onOrderChange: (arg: ChangeEvent<HTMLSelectElement>) => void;
  /**
   * @property {string[]}
   * Available options for ordering.
   */
  orderOptions: string[];
  /**
   * @property {string[]}
   * Literals matching the ordering options.
   */
  orderLiterals: string[];
  /**
   * @property {string}
   * Title for the filters form group.
   */
  filtersTitle: string;
  /**
   * @property {string[]}
   * Available options for filtering.
   */
  filtersOptions: string[];
  /**
   * @property {string[]}
   * Literals matching the filter options.
   */
  filtersLiterals: string[];
  /**
   * Sets the filter criteria state.
   * @param arg - Function to set the filter criteria state.
   */
  setFilters: Dispatch<SetStateAction<FilterCriteriaType[]>>;

  /**
   * Sets the state to clear selected checkboxes.
   * @param arg - Function to handle clearing selected checkboxes state.
   */
  setOnClearChecks?: () => void;

  /**
   * @property {boolean}
   * Indicates whether to clear the selected checkboxes.
   */
  onClearChecks: boolean;
}

const CharactersControlPanel = ({
  isDesktop,
  searchInput,
  setSearchInput,
  searchTitle,
  searchPlaceholder,
  setOnClearData,
  onEmptyData,
  emptyDataLiteral,
  orderTitle,
  onOrderChange,
  orderOptions,
  orderLiterals,
  filtersTitle,
  filtersOptions,
  filtersLiterals,
  setFilters,
  setOnClearChecks,
  onClearChecks,
}: ICharactersControlPanel) => {
  const getStyles = () => `${isDesktop ? 'hidden md:flex justify-center' : 'flex flex-col'}`;
  const getLabels = () =>
    isDesktop ? 'Desktop Characters List Control Panel' : 'Mobile Characters List Control Panel';

  return (
    <form className={`focus-within gap-4 ${getStyles()}`} aria-label={getLabels()}>
      <SearchGroup
        classNameFieldset='text-white'
        classNameInput='w-full md:w-auto'
        title={searchTitle}
        placeholderLiteral={searchPlaceholder}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setOnClearData={setOnClearData}
        onEmptyData={onEmptyData}
        emptyDataLiteral={emptyDataLiteral}
      />
      <SelectGroup
        classNameFieldset='text-white'
        classNameSelect='w-full md:w-auto'
        title={orderTitle}
        onChange={onOrderChange}
        options={orderOptions}
        optionLiterals={orderLiterals}
      />
      <CheckboxesList
        classNameFieldset='text-white'
        title={filtersTitle}
        options={filtersOptions}
        optionLiterals={filtersLiterals}
        setOptions={setFilters}
        setOnClear={setOnClearChecks}
        onClearChecks={onClearChecks}
      />
    </form>
  );
};

export default CharactersControlPanel;
