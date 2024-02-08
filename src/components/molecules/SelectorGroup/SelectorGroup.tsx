import Input from '@/components/atoms/Input';
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
      <Input isSelect onChange={onChange} name='order'>
        {options.map((option, index) => (
          <option key={option} value={option}>
            {optionLiterals[index]}
          </option>
        ))}
      </Input>
    </fieldset>
  );
};

export default SelectorGroup;
