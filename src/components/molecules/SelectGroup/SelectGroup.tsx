import { ChangeEventHandler } from 'react';
import FormGroupContainer from '../FormGroupContainer';
import { getParentSelectors } from '@/utils/helpers';
import { InputSelect } from '@/components/atoms/InputSelect';

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
   * Optional aria label for the select input.
   */
  inputAriaLabel?: string;
  /**
   * Optional class name for the select input.
   */
  classNameSelect?: string;
  /**
   * Optional class name for the select fieldset.
   */
  classNameFieldset?: string;
}

export interface IOption {
  value: string;
  label: string;
}

const SelectGroup = ({
  inputAriaLabel,
  title,
  onChange,
  options,
  optionLiterals,
  classNameFieldset,
  classNameSelect,
}: ISelectProps) => {
  return (
    <FormGroupContainer classNameFieldset={getParentSelectors(classNameFieldset)} title={title}>
      <InputSelect
        options={options}
        optionLiterals={optionLiterals}
        onChange={onChange}
        aria-label={inputAriaLabel}
        className={classNameSelect}
      />
    </FormGroupContainer>
  );
};

export default SelectGroup;
