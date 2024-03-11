import { getParentSelectors } from '@/utils/helpers';

export interface IFormGroupContainerProps {
  title: string;
  /**
   * @property {string}
   * Additional class name for <fieldset>
   */
  classNameFieldset?: string;
  children: React.ReactNode;
}

const FormGroupContainer = ({ classNameFieldset, title, children }: IFormGroupContainerProps) => {
  return (
    <fieldset className={getParentSelectors(classNameFieldset)}>
      <legend className='mb-1'>{title}</legend>
      {children}
    </fieldset>
  );
};

export default FormGroupContainer;
