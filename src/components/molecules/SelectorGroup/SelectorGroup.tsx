import { ChangeEventHandler } from 'react';

export interface SelectorProps {
  title: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}

const SelectorGroup = ({ title, onChange, options }: SelectorProps) => {
  return (
    <fieldset>
      <legend>{title}</legend>
      <select onChange={onChange} name='order'>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectorGroup;
