import { ChangeEventHandler } from 'react';

export interface SelectorProps {
  title: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: string[];
  optionLiterals: string[];
  className?: string;
}

const SelectorGroup = ({ title, onChange, options, optionLiterals, className }: SelectorProps) => {
  return (
    <fieldset className={className}>
      <legend>{title}</legend>
      <select onChange={onChange} name='order'>
        {options.map((option, index) => (
          <option key={option} value={option}>
            {optionLiterals[index]}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectorGroup;
