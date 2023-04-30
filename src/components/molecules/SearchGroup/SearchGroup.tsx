import { ChangeEvent } from 'react';
export interface SearchGroupProps {
  title: string;
  placeholderLiteral: string;
  setSearchInput: (arg: string) => void;
}

const SearchGroup = ({ title, placeholderLiteral, setSearchInput }: SearchGroupProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
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
