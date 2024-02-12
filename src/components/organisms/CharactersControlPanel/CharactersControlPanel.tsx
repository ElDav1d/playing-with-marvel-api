import CheckboxesList from '@/components/molecules/CheckboxesList/CheckboxesList';
import SearchGroup from '@/components/molecules/SearchGroup';
import SelectGroup from '@/components/molecules/SelectGroup';
import { FilterCriteria } from '@/components/pages/Characters/interfaces/characters';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface ICharactersControlPanel {
  /**
   * Current search input value.
   */
  searchInput: string;
  /**
   * Sets search input value.
   * @param arg - The new search input value.
   */
  setSearchInput: (arg: string) => void;
  /**
   * Title for search form group.
   */
  searchTitle: string;
  /**
   * Placeholder text for search input.
   */
  searchPlaceholder: string;
  /**
   * Sets clear data state.
   * @param arg - Indicates data should be cleared.
   */
  setOnClearData: (arg: boolean) => void;
  /**
   * Indicates data is empty.
   */
  isEmptyData: boolean;
  /**
   * Literal for user message
   */
  emptyDataLiteral: string;
  /**
   * Title for ordering form group.
   */
  orderTitle: string;
  /**
   * Handles change in ordering.
   * @param arg - Event representing the change in ordering.
   */
  onOrderChange: (arg: ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Available options for ordering.
   */
  orderOptions: string[];
  /**
   * Literals matching ordering options.
   */
  orderLiterals: string[];
  /**
   * Title for filters form group.
   */
  filtersTitle: string;
  /**
   * Available options for filters.
   */
  filtersOptions: string[];
  /**
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
  return (
    <>
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
        classNameUL='md:h-full flex flex-col md:flex-row gap-2 md:items-center'
        title={filtersTitle}
        options={filtersOptions}
        optionLiterals={filtersLiterals}
        setOptions={setFilters}
      />
    </>
  );
};

export default CharactersControlPanel;
