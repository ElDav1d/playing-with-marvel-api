import { ChangeEventHandler } from 'react';

export interface FilterProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  filters: string[];
}

const FilterSelector = ({ filters, onChange }: FilterProps) => {
  return (
    <fieldset>
      <legend>Filter results:</legend>
      <ul>
        {filters.map((filter) => (
          <li key={filter}>
            <input type='checkbox' id={filter} name={filter} value={filter} onChange={onChange} />
            <label htmlFor={filter}>{filter}</label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default FilterSelector;
