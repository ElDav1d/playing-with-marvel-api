import { ChangeEvent } from 'react';
export interface SearchGroupProps {
  title: string;
  placeholderLiteral: string;
  setOnClearData?: (arg: boolean) => void;
  setSearchInput: (arg: string) => void;
}

const SearchGroup = ({
  title,
  placeholderLiteral,
  setOnClearData,
  setSearchInput,
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
    </fieldset>
  );
};

export default SearchGroup;
