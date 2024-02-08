import Input from '@/components/atoms/Input';
import { ChangeEvent } from 'react';
export interface SearchGroupProps {
  title: string;
  placeholderLiteral: string;
  emptyDataLiteral: string;
  isEmptyData: boolean;
  searchInput: string;
  setOnClearData?: (arg: boolean) => void;
  setSearchInput: (arg: string) => void;
  className?: string;
}

const SearchGroup = ({
  title,
  placeholderLiteral,
  setOnClearData,
  setSearchInput,
  emptyDataLiteral,
  isEmptyData,
  searchInput,
  className,
}: SearchGroupProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    if (setOnClearData) setOnClearData(true);
    setSearchInput(event.target.value);
  };

  return (
    <fieldset className={className}>
      <legend>{title}</legend>
      <div>
        <Input
          type='text'
          onChange={handleSearch}
          placeholder={placeholderLiteral}
          value={searchInput}
        />
      </div>
      {isEmptyData && <h3>{emptyDataLiteral}</h3>}
    </fieldset>
  );
};

export default SearchGroup;
