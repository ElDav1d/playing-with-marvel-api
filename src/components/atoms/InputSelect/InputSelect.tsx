import Select from 'react-select';
import { ChangeEventHandler } from 'react';
import EmotionCacheProvider from './EmotionCacheProvider';
import { useHandleSelectChange } from './hooks';
import { overrideClasses } from './utils';
import { IOverrideClassesConfig } from './utils/overrideClasses';

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

  const handleSelectChange = useHandleSelectChange(onChange);

  type overrideClassesConfig = Omit<IOverrideClassesConfig, 'state'>;

  const containerConfig: overrideClassesConfig = {
    outerClassName: className,
    defaultClassNames: 'h-full bg-black border shadow appearance-none focus-visible-border',
    onStateClassNames: 'accesible-outline border-red',
    statelessClassNames: 'border-white',
  };

  const optionConfig: overrideClassesConfig = {
    defaultClassNames: 'bg-black text-white',
    onStateClassNames: 'bg-red',
    statelessClassNames: '',
  };

  const classNamesOverride = {
    container: ({ isFocused }: { isFocused: boolean }) =>
      overrideClasses({ state: isFocused, ...containerConfig }),
    control: () => 'bg-black shadow appearance-none border-none',
    menu: () => 'my-0 bg-black border border-red rounded-none animate-appearFromTop',
    menuList: () => 'p-0',
    option: ({ isFocused }: { isFocused: boolean }) =>
      overrideClasses({ state: isFocused, ...optionConfig }),
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
