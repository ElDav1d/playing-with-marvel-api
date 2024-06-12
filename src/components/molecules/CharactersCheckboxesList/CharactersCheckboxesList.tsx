import { FormGroupContainer, CheckboxGroup, CheckboxList } from 'eldav1d-marvel-ui';
import {
  FilterCriteriaType,
  FilterCriteria,
  HumanizedFilterCriteria,
} from '@/components/pages/Characters/interfaces/characters';
import { useCharactersContext } from '@/components/pages/Characters/hooks';

const CharactersCheckboxesList = () => {
  const { charactersContextState, charactersContextDispatch } = useCharactersContext();
  const FILTERS_TITLE = 'Filter results:';
  const options = Object.values(FilterCriteria);

  const changeHandler = (option: FilterCriteriaType, index: number) => {
    charactersContextDispatch({
      type: 'SET_FILTER',
      filter: options[index],
      isChecked: !charactersContextState.filters[option],
    });
  };

  return (
    <FormGroupContainer classNameFieldset='text-white w-full lg:w-auto' title={FILTERS_TITLE}>
      <CheckboxList options={options}>
        {(option, index) => (
          <CheckboxGroup
            option={option}
            literal={HumanizedFilterCriteria[options[index]]}
            isChecked={charactersContextState.filters[option as FilterCriteriaType]}
            onChange={() => changeHandler(option as FilterCriteriaType, index)}
          />
        )}
      </CheckboxList>
    </FormGroupContainer>
  );
};

export default CharactersCheckboxesList;
