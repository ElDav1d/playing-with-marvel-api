import { FormGroupContainer, CheckboxGroup } from 'eldav1d-marvel-ui';
import {
  FilterCriteriaType,
  FilterCriteria,
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
      <ul className='md:h-full flex flex-col md:flex-row gap-2 md:items-center'>
        {options.map((option, index) => (
          <li className='flex items-center' key={option}>
            <CheckboxGroup
              option={option}
              literal={options[index]}
              isChecked={false}
              onChange={() => changeHandler(option, index)}
            />
          </li>
        ))}
      </ul>
    </FormGroupContainer>
  );
};

export default CharactersCheckboxesList;
