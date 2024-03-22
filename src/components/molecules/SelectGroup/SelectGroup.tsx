import Select from 'react-select';
import { ChangeEventHandler } from 'react';
import FormGroupContainer from '../FormGroupContainer';
import { getParentSelectors } from '@/utils/helpers';

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

const SelectGroup = ({
  inputAriaLabel,
  title,
  onChange,
  options,
  optionLiterals,
  classNameFieldset,
  classNameSelect,
}: ISelectProps) => {
  const mappedOptions = options.map((option, index) => ({
    value: option,
    label: optionLiterals[index],
  }));

  const handleSelectChange = (newValue: { value: string; label: string } | null) => {
    console.log(newValue);
    if (newValue) {
      onChange({
        target: { value: newValue.value, name: 'order' },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  return (
    <FormGroupContainer classNameFieldset={getParentSelectors(classNameFieldset)} title={title}>
      <Select
        options={mappedOptions}
        onChange={handleSelectChange}
        aria-label={inputAriaLabel}
        className={classNameSelect}
        placeholder={mappedOptions[0].label}
      />
    </FormGroupContainer>
  );
};

export default SelectGroup;
