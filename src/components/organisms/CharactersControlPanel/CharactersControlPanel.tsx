import CheckboxesList from '@/components/molecules/CheckboxesList/CheckboxesList';
import SearchGroup from '@/components/molecules/SearchGroup';
import SelectGroup from '@/components/molecules/SelectGroup';
import { FilterCriteria } from '@/components/pages/Characters/interfaces/characters';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface ICharactersControlPanel {
    /**
   * @property {boolean}
   * Indicates viewport.
   */
    isDesktop?: boolean;
  /**
   * @property {string}
   * Current search input value.
   */
  searchInput: string;
  /**
   * Sets search input value.
   * @param arg - The new search input value.
   */
  setSearchInput: (arg: string) => void;
  /**
   * @property {string}
   * Title for search form group.
   */
  searchTitle: string;
  /**
   * @property {string}
   * Placeholder text for search input.
   */
  searchPlaceholder: string;
  /**
   * Sets clear data state.
   * @param arg - Indicates data should be cleared.
   */
  setOnClearData: (arg: boolean) => void;
  /**
   * @property {boolean}
   * Indicates data is empty.
   */
  isEmptyData: boolean;
  /**
   * @property {string}
   * Literal for user message
   */
  emptyDataLiteral: string;
  /**
   * @property {string}
   * Title for ordering form group.
   */
  orderTitle: string;
  /**
   * Handles change in ordering.
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
   * Literals matching ordering options.
   */
  orderLiterals: string[];
  /**
   * @property {string}
   * Title for filters form group.
   */
  filtersTitle: string;
  /**
   * @property {string[]}
   * Available options for filters.
   */
  filtersOptions: string[];
  /**
   * @property {string[]}
   * Literals matching filter options.
   */
  filtersLiterals: string[];
  /**
   * Sets filter criteria.
   * @param arg - Function to set filter criteria state.
   */
  setFilters: Dispatch<SetStateAction<FilterCriteria[]>>;
}

const CharactersControlPanel = ({
  isDesktop,
  searchInput,
  setSearchInput,
  searchTitle,
  searchPlaceholder,
  setOnClearData,
  isEmptyData,
  emptyDataLiteral,
  orderTitle: selectTitle,
  onOrderChange: onSelectChange,
  orderOptions: selectOptions,
  orderLiterals: selectLiterals,
  filtersTitle,
  filtersOptions,
  filtersLiterals,
  setFilters,
}: ICharactersControlPanel) => {
  const getStyles = () => `${isDesktop ? 'hidden md:flex gap-8 justify-center' : ''}`
  const getLabels = () => isDesktop ? 'Desktop Characters List Control Panel' : 'Mobile Characters List Control Panel'

  return (
    <form className={getStyles()} aria-label={getLabels()}>
      <SearchGroup
        classNameFieldset='text-white'
        classNameInput='w-full md:w-auto'
        title={searchTitle}
        placeholderLiteral={searchPlaceholder}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setOnClearData={setOnClearData}
        isEmptyData={isEmptyData}
        emptyDataLiteral={emptyDataLiteral}
      />
      <SelectGroup
        classNameFieldset='text-white'
        classNameInput='w-full md:w-auto'
        title={selectTitle}
        onChange={onSelectChange}
        options={selectOptions}
        optionLiterals={selectLiterals}
      />
      <CheckboxesList
        classNameFieldset='text-white'
        title={filtersTitle}
        options={filtersOptions}
        optionLiterals={filtersLiterals}
        setOptions={setFilters}
      />
      boo
    </form>
  );
};

export default CharactersControlPanel;
