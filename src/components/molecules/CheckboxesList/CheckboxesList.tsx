import CheckboxGroup from '@/components/atoms/CheckboxGroup';
import { ChangeEvent, useEffect, useState } from 'react';
import FormGroupContainer from '../FormGroupContainer';

/**
 * Interface for CheckboxesList component props
 * @template T - Type parameter for the setOptions function
 */
export interface ICheckboxesListProps<T> {
  /**
   * @property {string}
   * Title of the options list.
   */
  title: string;
  /**
   * @property {string[]}
   * List of options to be rendered as checkboxes.
   */
  options: string[];
  /**
   * @property {string[]}
   * List of literals corresponding to each option.
   */
  optionLiterals: string[];
  /**
   * Function to set the selected options.
   * @param arg - Array of type T representing selected options.
   */
  setOptions: (arg: Array<T>) => void;
  /**
   * Function to handle clearing of selected options.
   */
  setOnClear?: () => void;
  /**
   * Indicates whether to clear the selected checkboxes.
   */
  onClearChecks?: boolean;
  /**
   * @property {string}
   * Additional class name for the <fieldset> element.
   */
  classNameFieldset?: string;
  /**
   * @property {string}
   * Additional class name for the <ul> element.
   */
  classNameUL?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const CheckboxesList = <T extends unknown>({
  title,
  options,
  optionLiterals,
  setOptions,
  setOnClear,
  onClearChecks,
  classNameFieldset,
  classNameUL,
}: ICheckboxesListProps<T>) => {
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (onClearChecks) {
      setCheckedOptions([]);
      if (setOnClear) setOnClear();
    }

    setOptions(checkedOptions as T[]);
  }, [checkedOptions, onClearChecks]);

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
    <FormGroupContainer classNameFieldset={classNameFieldset} title={title}>
      <ul className={`md:h-full flex flex-col md:flex-row gap-2 md:items-center ${classNameUL}`}>
        {options.map((option, index) => (
          <li className='flex items-center' key={option}>
            <CheckboxGroup
              option={option}
              literal={optionLiterals[index]}
              toggleOption={toggleOption}
              onClear={!!onClearChecks && onClearChecks}
            />
          </li>
        ))}
      </ul>
    </FormGroupContainer>
  );
};

export default CheckboxesList;
