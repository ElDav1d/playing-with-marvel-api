import { ChangeEvent } from 'react';
export interface SearchGroupProps {
  title: string;
  placeholderLiteral: string;
  emptyDataLiteral: string;
  isEmptyData: boolean;
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
        <input type='text' onChange={handleSearch} placeholder={placeholderLiteral} />
      </div>
      {isEmptyData && <h3>{emptyDataLiteral}</h3>}
    </fieldset>
  );
};

export default SearchGroup;
