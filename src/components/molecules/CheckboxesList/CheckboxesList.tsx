import CheckBoxGroup from '@/components/atoms/CheckBoxGroup/CheckBoxGroup';
import { ChangeEvent, useEffect, useState } from 'react';

export interface CheckboxesListProps<T> {
  title: string;
  options: string[];
  optionLiterals: string[];
  setOptions: (arg: Array<T>) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const CheckboxesList = <T extends unknown>({
  title,
  options,
  optionLiterals,
  setOptions,
}: CheckboxesListProps<T>) => {
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
    <fieldset>
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
