import { ChangeEventHandler, forwardRef, Ref } from 'react';

export interface SearchProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchCharacters = forwardRef(({ onChange }: SearchProps, ref: Ref<HTMLInputElement>) => {
  return (
    <fieldset>
      <legend>Search results:</legend>
      <div>
        <input
          type='text'
          id={'characterSearch'}
          name={'characterSearch'}
          ref={ref}
          onChange={onChange}
        />
      </div>
    </fieldset>
  );
});

export default SearchCharacters;
