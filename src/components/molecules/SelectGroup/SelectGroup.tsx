import '@/index.css';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Select from 'react-select';
import { ChangeEventHandler, useMemo } from 'react';
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

const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const titleElement = document.querySelector('title');

  if (!titleElement) {
    throw new Error('No <title> element found in document');
  }

  const cache = useMemo(
    () =>
      createCache({
        key: 'with-tailwind',
        insertionPoint: titleElement,
      }),
    [],
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

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
    if (newValue) {
      onChange({
        target: { value: newValue.value, name: 'order' },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  const classNamesOverride = {
    container: ({ isFocused }: { isFocused: boolean }) =>
      `h-full bg-black border shadow appearance-none focus-visible-border ${
        isFocused ? 'accesible-outline border-red' : 'border-white'
      } ${getParentSelectors(classNameSelect)}`,
    control: () => 'bg-black shadow appearance-none border-none',
    menu: () => 'my-0 bg-black border border-red rounded-none animate-appearFromTop',
    menuList: () => 'p-0',
    option: ({ isFocused }: { isFocused: boolean }) =>
      `bg-black text-white ${isFocused ? 'bg-red' : ''}`,
    singleValue: () => 'text-white',
  };

  return (
    <FormGroupContainer classNameFieldset={getParentSelectors(classNameFieldset)} title={title}>
      <EmotionCacheProvider>
        <Select
          options={mappedOptions}
          onChange={handleSelectChange}
          aria-label={inputAriaLabel}
          className={classNameSelect}
          placeholder={mappedOptions[0].label}
          classNames={classNamesOverride}
        />
      </EmotionCacheProvider>
    </FormGroupContainer>
  );
};

export default SelectGroup;
