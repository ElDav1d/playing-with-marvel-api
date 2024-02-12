import { ChangeEventHandler } from 'react';
import Input from '../Input';

/**
 * Single checkbox within a group of checkboxes
 * @interface
 */
export interface ICheckboxGroupProps {
  /**
   * @property {string}
   * Label or value bound to option.
   */
  option: string;
  /**
   * @property {string}
   * Literal  corresponding to option.
   */
  literal: string;
  /**
   * Handles changes in the checkbox state.
   * @callback ChangeEventHandler
   * @param {Event} event - The change event object.
   * @property {ChangeEventHandler<HTMLInputElement>}
   */
  toggleOption: ChangeEventHandler;
}

const CheckboxGroup = ({ option, literal, toggleOption }: ICheckboxGroupProps) => {
  return (
    <>
      <Input
        type='checkbox'
        id={option}
        name={option}
        value={option}
        onChange={toggleOption}
      />
      <label htmlFor={option}>{literal}</label>
    </>
  );
};

export default CheckboxGroup;
