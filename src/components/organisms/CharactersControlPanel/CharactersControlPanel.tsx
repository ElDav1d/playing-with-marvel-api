import CheckboxesList from '@/components/molecules/CheckboxesList/CheckboxesList';
import SearchGroup from '@/components/molecules/SearchGroup/SearchGroup';
import SelectorGroup from '@/components/molecules/SelectorGroup/SelectorGroup';
import { FilterCriteria } from '@/components/pages/Characters/interfaces/characters';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface ICharactersControlPanel {
  /**
   * @property {string}
   */
  searchInput: string;
  /**
   * Function to set the selected options
   * @param arg - string is searchInput
   */
  setSearchInput: (arg: string) => void;
  /**
   * Function to ser cleared data state
   * @param arg -
   */
  searchTitle: string;
  searchPlaceholder: string;
  setOnClearData: (arg: boolean) => void;
  isEmptyData: boolean;
  emptyDataLiteral: string;
  orderTitle: string;
  onOrderChange: (arg: ChangeEvent<HTMLSelectElement>) => void;
  orderOptions: string[];
  orderLiterals: string[];
  filtersTitle: string;
  filtersOptions: string[];
  filtersLiterals: string[];
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
        className='text-white'
        title={searchTitle}
        placeholderLiteral={searchPlaceholder}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setOnClearData={setOnClearData}
        isEmptyData={isEmptyData}
        emptyDataLiteral={emptyDataLiteral}
      />
      <SelectorGroup
        className='text-white'
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
    </>
  );
};

export default CharactersControlPanel;
