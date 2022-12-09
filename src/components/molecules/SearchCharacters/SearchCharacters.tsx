import { ChangeEventHandler, KeyboardEventHandler, forwardRef, Ref } from 'react';

export interface SearchProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const SearchCharacters = forwardRef(
  ({ onChange, onKeyDown }: SearchProps, ref: Ref<HTMLInputElement>) => {
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
            onKeyDown={onKeyDown}
          />
        </div>
      </fieldset>
    );
  },
);

export default SearchCharacters;
