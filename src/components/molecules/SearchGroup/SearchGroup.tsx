import Input from '@/components/atoms/Input';
import { ChangeEvent } from 'react';
import FormGroupContainer from '../FormGroupContainer';

/**
 * UI group for search input .
 */
export interface SearchGroupProps {
  /**
   * The title of the search group.
   */
  title: string;
  /**
   * The placeholder text for the search input.
   */
  placeholderLiteral: string;
  /**
   * The text to display when there is no data and `isEmptyData` is `true`.
   */
  emptyDataLiteral?: string;
  /**
   * Determines whether the data is empty or not.
   */
  onEmptyData: boolean;
  /**
   * The current value of the search input.
   */
  searchInput: string;
  /**
   * Callback function to set the value of `isClearData` to `true` or `false`.
   */
  setOnClearData?: (arg: boolean) => void;
  /**
   * Callback function to set the value of `searchInput`.
   */
  setSearchInput: (arg: string) => void;
  /**
   * The class name for the search input.
   */
  classNameInput?: string;
  /**
   * The class name for the fieldset container.
   */
  classNameFieldset?: string;
}

const SearchGroup = ({
  title,
  placeholderLiteral,
  setOnClearData,
  setSearchInput,
  emptyDataLiteral,
  onEmptyData,
  searchInput,
  classNameInput,
  classNameFieldset,
}: SearchGroupProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    if (setOnClearData) setOnClearData(true);
    setSearchInput(event.target.value);
  };

  return (
    <FormGroupContainer title={title} classNameFieldset={classNameFieldset}>
      <Input
        className={classNameInput}
        type='text'
        onChange={handleSearch}
        placeholder={placeholderLiteral}
        value={searchInput}
      />
      {emptyDataLiteral && onEmptyData && (
        <h3 aria-live='assertive' className='md:sr-only'>
          {emptyDataLiteral}
        </h3>
      )}
    </FormGroupContainer>
  );
};

export default SearchGroup;
