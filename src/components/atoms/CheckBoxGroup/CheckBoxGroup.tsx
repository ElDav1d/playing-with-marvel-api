import { ChangeEventHandler } from 'react';
export interface CheckBoxGroupProps {
  option: string;
  literal: string;
  toggleOption: ChangeEventHandler<HTMLInputElement>;
}

const CheckBoxGroup = ({ option, literal, toggleOption }: CheckBoxGroupProps) => {
  return (
    <>
      <input type='checkbox' id={option} name={option} value={option} onChange={toggleOption} />
      <label htmlFor={option}>{literal}</label>
    </>
  );
};

export default CheckBoxGroup;
