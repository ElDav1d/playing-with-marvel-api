import { FormGroupContainer } from 'eldav1d-marvel-ui';
import { FilterCriteria } from '@/components/pages/Characters/interfaces/characters';
import { CharactersCheckBoxGroup } from '@/components/atoms/CharactersCheckBoxGroup';

const CharactersCheckboxesList = () => {
  const FILTERS_TITLE = 'Filter results:';
  const options = Object.values(FilterCriteria);

  return (
    <FormGroupContainer classNameFieldset='text-white w-full lg:w-auto' title={FILTERS_TITLE}>
      <ul className='md:h-full flex flex-col md:flex-row gap-2 md:items-center'>
        {options.map((option, index) => (
          <li className='flex items-center' key={option}>
            <CharactersCheckBoxGroup option={option} literal={options[index]} />
          </li>
        ))}
      </ul>
    </FormGroupContainer>
  );
};

export default CharactersCheckboxesList;
