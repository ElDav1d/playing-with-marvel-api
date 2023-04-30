import { ChangeEvent } from 'react';
export interface SearchGroupProps {
  title: string;
  placeholderLiteral: string;
  emptyDataLiteral: string;
  isEmptyData: boolean;
  setOnClearData?: (arg: boolean) => void;
  setSearchInput: (arg: string) => void;
}

const SearchGroup = ({
  title,
  placeholderLiteral,
  setOnClearData,
  setSearchInput,
  emptyDataLiteral,
  isEmptyData,
}: SearchGroupProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    if (setOnClearData) setOnClearData(true);
    setSearchInput(event.target.value);
  };

  return (
    <fieldset>
      <legend>{title}</legend>
      <div>
        <input type='text' onChange={handleSearch} placeholder={placeholderLiteral} />
      </div>
      {isEmptyData && <h3>{emptyDataLiteral}</h3>}
    </fieldset>
  );
};

export default SearchGroup;
