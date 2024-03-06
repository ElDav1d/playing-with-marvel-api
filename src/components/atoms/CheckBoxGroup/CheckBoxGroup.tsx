import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../Input';

/**
 * Single checkbox within a group of checkboxes
 * @interface
 */
export interface ICheckboxGroupProps {
  /**
   * @property {string}
   * Label or value bound to the option.
   */
  option: string;
  /**
   * @property {string}
   * Literal corresponding to the option.
   */
  literal: string;
  /**
   * Handles changes in the checkbox state.
   * @callback ChangeEventHandler
   * @param {ChangeEvent<HTMLInputElement>} event - The change event object.
   */
  toggleOption: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * @property {boolean}
   * Indicates Checkbox should be cleared.
   */
  onClear: boolean;
}

const CheckboxGroup = ({ option, literal, toggleOption, onClear }: ICheckboxGroupProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (onClear && isChecked) setIsChecked(false);
  }, [onClear]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    toggleOption(event);
    setIsChecked((prevState) => !prevState);
  };

  return (
    <>
      <Input
        aria-label={option}
        type='checkbox'
        id={option}
        name={option}
        value={option}
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor={option}>{literal}</label>
    </>
  );
};

export default CheckboxGroup;
