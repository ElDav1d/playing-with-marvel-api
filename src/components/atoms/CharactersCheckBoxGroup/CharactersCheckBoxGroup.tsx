import { FilterCriteriaType } from '@/components/pages/Characters/interfaces/characters';
import Input from '../Input';
import { useFiltersContext } from '@/components/pages/Characters/hooks';

/**
 * Single checkbox within a group of characters filtering checkboxes
 * @interface
 */
export interface ICharactersCheckBoxGroupProps {
  /**
   * @property {FilterCriteriaType}
   * Label or value bound to the option.
   */
  option: FilterCriteriaType;
  /**
   * @property {string}
   * Literal corresponding to the option.
   */
  literal: string;
}

const CharactersCheckBoxGroup = ({ option, literal }: ICharactersCheckBoxGroupProps) => {
  const { filtersContextState, filtersContextDispatch } = useFiltersContext();

  const handleChange = () => {
    filtersContextDispatch({
      type: 'SET_FILTER',
      filter: option,
      isChecked: !filtersContextState[option],
    });
  };

  return (
    <>
      <Input
        aria-label={option}
        type='checkbox'
        id={option}
        name={option}
        value={option}
        onChange={handleChange}
        checked={filtersContextState[option]}
      />
      <label htmlFor={option}>{literal}</label>
    </>
  );
};

export default CharactersCheckBoxGroup;
