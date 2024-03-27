import { getParentSelectors } from '@/utils/helpers';

export interface IOverrideClassesConfig {
  state: boolean;
  outerClassName?: string;
  defaultClassNames: string;
  onStateClassNames: string;
  statelessClassNames: string;
}

const overrideClasses = ({
  state,
  outerClassName,
  defaultClassNames,
  onStateClassNames,
  statelessClassNames,
}: IOverrideClassesConfig) => {
  const fixedClassNames = defaultClassNames;

  const handleFocus = () => {
    return state ? onStateClassNames : statelessClassNames;
  };

  return `${fixedClassNames} ${handleFocus()} ${getParentSelectors(outerClassName)}`;
};

export default overrideClasses;
