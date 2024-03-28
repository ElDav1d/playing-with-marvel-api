import { getParentSelectors } from '@/utils/helpers';
import React from 'react';

/**
 * Props for text or checkbox input elements
 */
export interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  /**
   * The type of the input.
   */
  type?: 'text' | 'checkbox';
  /**
   * The class name for the input.
   */
  className?: string;
}

const Input: React.FC<IInputProps> = ({ className, type, ...rest }) => {
  const sharedStyle = `bg-black border border-white shadow appearance-none focus-visible-border ${getParentSelectors(
    className,
  )}`;

  const textBoxStyles = 'py-2 px-3';

  const getClassName = () => {
    if (type === 'checkbox') {
      return `mr-2 h-4 w-4 checked:bg-red ${sharedStyle}`;
    } else {
      return `${textBoxStyles} ${sharedStyle}`;
    }
  };

  return <input type={type} className={getClassName()} {...(rest as IInputProps)} />;
};

export default Input;
