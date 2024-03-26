import Select from 'react-select';
import { ChangeEventHandler, useState } from 'react';
import { getParentSelectors } from '@/utils/helpers';
import { IOption } from '@/components/molecules/SelectGroup/SelectGroup';
import EmotionCacheProvider from './EmotionCacheProvider';

export interface IInputSelectProps {
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
  ariaLabel?: string;
  /**
   * Optional class name for the select input.
   */
  className?: string;
}

const InputSelect = ({
  ariaLabel,
  onChange,
  options,
  optionLiterals,
  className,
}: IInputSelectProps) => {
  const mappedOptions = options.map((option, index) => ({
    value: option,
    label: optionLiterals[index],
  }));

  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  const handleSelectChange = (newValue: { value: string; label: string } | null) => {
    if (newValue && newValue.value !== selectedOption?.value) {
      setSelectedOption(newValue);
      onChange({
        target: { value: newValue.value, name: 'order' },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  const classNamesOverride = {
    container: ({ isFocused }: { isFocused: boolean }) =>
      `h-full bg-black border shadow appearance-none focus-visible-border ${
        isFocused ? 'accesible-outline border-red' : 'border-white'
      } ${getParentSelectors(className)}`,
    control: () => 'bg-black shadow appearance-none border-none',
    menu: () => 'my-0 bg-black border border-red rounded-none animate-appearFromTop',
    menuList: () => 'p-0',
    option: ({ isFocused }: { isFocused: boolean }) =>
      `bg-black text-white ${isFocused ? 'bg-red' : ''}`,
    singleValue: () => 'text-white',
  };

  return (
    <EmotionCacheProvider>
      <Select
        options={mappedOptions}
        onChange={handleSelectChange}
        aria-label={ariaLabel}
        placeholder={mappedOptions[0].label}
        classNames={classNamesOverride}
      />
    </EmotionCacheProvider>
  );
};

export default InputSelect;
