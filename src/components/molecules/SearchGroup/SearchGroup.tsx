import Input from '@/components/atoms/Input';
import { ChangeEvent } from 'react';
import FormGroupContainer from '../FormGroupContainer';
export interface SearchGroupProps {
  title: string;
  placeholderLiteral: string;
  emptyDataLiteral?: string;
  isEmptyData: boolean;
  searchInput: string;
  setOnClearData?: (arg: boolean) => void;
  setSearchInput: (arg: string) => void;
  classNameInput?: string;
  classNameFieldset?: string;
}

const SearchGroup = ({
  title,
  placeholderLiteral,
  setOnClearData,
  setSearchInput,
  emptyDataLiteral,
  isEmptyData,
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
      <div>
        <Input
          className={classNameInput}
          type='text'
          onChange={handleSearch}
          placeholder={placeholderLiteral}
          value={searchInput}
        />
      </div>
      {emptyDataLiteral && isEmptyData && <h3 className='md:hidden'>{emptyDataLiteral}</h3>}
    </FormGroupContainer>
  );
};

export default SearchGroup;
