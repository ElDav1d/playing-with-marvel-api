import { useState, ChangeEventHandler } from 'react';
import { IOption } from '@/components/molecules/SelectGroup/SelectGroup';

const useHandleSelectChange = (onChange: ChangeEventHandler<HTMLSelectElement>) => {
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  const handleSelectChange = (newValue: IOption | null) => {
    if (newValue && newValue.value !== selectedOption?.value) {
      setSelectedOption(newValue);
      onChange({
        target: { value: newValue.value, name: 'order' },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  return handleSelectChange;
};

export default useHandleSelectChange;
