import CheckBoxGroup from '@/components/atoms/CheckBoxGroup/CheckBoxGroup';
import { ChangeEvent, useEffect, useState } from 'react';

/**
 * Interface for CheckboxesList component props
 * @template T - Type parameter for the setOptions function
 */
export interface ICheckboxesListProps<T> {
  /**
   * @property {string}
   * Title of options list
   */
  title: string;
  /**
   * @property {string[]}
   * List of options as checkboxes
   */
  options: string[];
  /**
   * @property {string[]}
   * List of literals corresponding to each option
   */
  optionLiterals: string[];
  /**
   * Function to set the selected options
   * @param arg - Array of type T represets selected options
   */
  setOptions: (arg: Array<T>) => void;
  /**
   * @property {string}
   * Additional class name for <fieldset>
   */
  classNameFieldset?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const CheckboxesList = <T extends unknown>({
  title,
  options,
  optionLiterals,
  setOptions,
  classNameFieldset,
}: ICheckboxesListProps<T>) => {
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(checkedOptions as T[]);
  }, [checkedOptions]);

  const toggleOption = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as T;

    if (checkedOptions.includes(value as string)) {
      const newOptions = checkedOptions.filter((option) => option !== value);
      setCheckedOptions(newOptions);
    } else {
      setCheckedOptions([value as string, ...checkedOptions]);
    }
  };

  return (
    <fieldset className={classNameFieldset}>
      <legend>{title}</legend>
      <ul>
        {options.map((option, index) => (
          <li key={option}>
            <CheckBoxGroup
              option={option}
              literal={optionLiterals[index]}
              toggleOption={toggleOption}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default CheckboxesList;
