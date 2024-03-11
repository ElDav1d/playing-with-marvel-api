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

/**
 * Props for select input elements
 */
export interface ISelectProps extends React.ComponentPropsWithoutRef<'select'> {
  /**
   * The type of the select.
   */
  type?: 'select';
  /**
   * The children of the select.
   */
  children: React.ReactNode;
  /**
   * The class name for the select.
   */
  className?: string;
}

const Input: React.FC<IInputProps | ISelectProps> = ({ className, type, children, ...rest }) => {
  const sharedStyle = `bg-black border border-white shadow appearance-none focus-visible-border ${getParentSelectors(
    className,
  )}`;

  const textBoxStyles = 'py-2 px-3';

  switch (type) {
    case 'select':
      return (
        <select className={`${textBoxStyles} ${sharedStyle}`} {...(rest as ISelectProps)}>
          {children}
        </select>
      );
    case 'text':
      return (
        <input
          type={type}
          className={`${textBoxStyles} ${sharedStyle}`}
          {...(rest as IInputProps)}
        />
      );
    case 'checkbox':
      return (
        <input
          type={type}
          className={`mr-2 h-4 w-4 checked:bg-red ${sharedStyle}`}
          {...(rest as IInputProps)}
        />
      );
    default:
      return (
        <input
          type='text'
          className={`${textBoxStyles} ${sharedStyle}`}
          {...(rest as IInputProps)}
        />
      );
  }
};

export default Input;
