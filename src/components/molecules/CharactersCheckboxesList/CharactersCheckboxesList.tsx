import FormGroupContainer from '../FormGroupContainer';
import { getParentSelectors } from '@/utils/helpers';
import { FilterCriteriaType } from '@/components/pages/Characters/interfaces/characters';
import { CharactersCheckBoxGroup } from '@/components/atoms/CharactersCheckBoxGroup';

export interface ICharactersCheckboxesListProps<T> {
  /**
   * @property {string}
   * Title of the options list.
   */
  title: string;
  /**
   * @property {FilterCriteriaType[]}
   * List of options to be rendered as checkboxes.
   */
  options: FilterCriteriaType[];
  /**
   * @property {string[]}
   * List of literals corresponding to each option.
   */
  optionLiterals: string[];
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

const CharactersCheckboxesList = <T extends string>({
  title,
  options,
  optionLiterals,
  classNameFieldset,
  classNameUL,
}: ICharactersCheckboxesListProps<T>) => {
  return (
    <FormGroupContainer classNameFieldset={getParentSelectors(classNameFieldset)} title={title}>
      <ul
        className={`md:h-full flex flex-col md:flex-row gap-2 md:items-center ${getParentSelectors(
          classNameUL,
        )}`}
      >
        {options.map((option, index) => (
          <li className='flex items-center' key={option}>
            <CharactersCheckBoxGroup option={option} literal={optionLiterals[index]} />
          </li>
        ))}
      </ul>
    </FormGroupContainer>
  );
};

export default CharactersCheckboxesList;
