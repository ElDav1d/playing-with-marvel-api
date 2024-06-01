import { ChangeEvent } from 'react';
import { FormGroupContainer } from 'eldav1d-marvel-ui';
import { InputSelect } from '@/components/atoms/InputSelect';
import { useCharactersContext } from '@/components/pages/Characters/hooks';
import { FetchingOrder, HumanizedOrder } from '@/components/pages/Characters/interfaces/characters';

export interface ISelectProps {
  inputAriaLabel?: string;
}

const CharactersSelectGroup = ({ inputAriaLabel }: ISelectProps) => {
  const SELECT_TITLE = 'Order results';

  const { charactersContextState, charactersContextDispatch } = useCharactersContext();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as FetchingOrder;

    charactersContextDispatch({
      type: 'SET_ORDER',
      order: value,
    });
  };

  return (
    <FormGroupContainer classNameFieldset='text-white grow' title={SELECT_TITLE}>
      <InputSelect
        ariaLabel='order results select'
        options={Object.values(FetchingOrder)}
        optionLiterals={Object.values(HumanizedOrder)}
        onChange={handleChange}
        aria-label={inputAriaLabel}
        className='w-full'
        placeholder={HumanizedOrder[charactersContextState.order]}
        controlledValue={charactersContextState.order}
      />
    </FormGroupContainer>
  );
};

export default CharactersSelectGroup;
