import Input from '@/components/atoms/Input';
import { ChangeEventHandler } from 'react';
import FormGroupContainer from '../FormGroupContainer';

export interface ISelectProps {
  /**
   * Title of the select.
   */
  title: string;
  /**
   * Handles change events on the select.
   * @param event - The change event.
   */
  onChange: ChangeEventHandler<HTMLSelectElement>;
  /**
   * Available options for the select.
   */
  options: string[];
  /**
   * Literal strings corresponding to the options.
   */
  optionLiterals: string[];
  /**
   * Optional class name for the select input.
   */
  classNameInput?: string;
  /**
   * Optional class name for the select fieldset.
   */
  classNameFieldset?: string;
}

const SelectGroup = ({
  title,
  onChange,
  options,
  optionLiterals,
  classNameFieldset,
  classNameInput,
}: ISelectProps) => {
  return (
    <FormGroupContainer classNameFieldset={classNameFieldset} title={title}>
      <Input className={classNameInput} type='select' onChange={onChange} name='order'>
        {options.map((option, index) => (
          <option key={option} value={option}>
            {optionLiterals[index]}
          </option>
        ))}
      </Input>
    </FormGroupContainer>
  );
};

export default SelectGroup;
