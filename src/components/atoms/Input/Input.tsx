import React from 'react';

export interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  type?: 'text' | 'checkbox';
  className?: string;
}

export interface ISelectProps extends React.ComponentPropsWithoutRef<'select'> {
  type?: 'select';
  children: React.ReactNode;
  className?: string;
}

const Input: React.FC<IInputProps | ISelectProps> = ({ className, type, children, ...rest }) => {
  const sharedStyle = `bg-black border-white shadow appearance-none border focus:border-red focus:outline-double focus:outline-red ${className}`;

  const textBoxStyles = 'py-2 px-3'

  switch (type) {
    case 'select':
      return <select className={`${textBoxStyles} ${sharedStyle}`} {...rest as ISelectProps}>
        {children}
      </select>;
    case 'text':
      return <input type={type} className={`${textBoxStyles} ${sharedStyle}`}  {...rest as IInputProps} />;
    case 'checkbox':
      return <input type={type} className={`mr-2 h-4 w-4 checked:bg-red ${sharedStyle}`} {...rest as IInputProps} />;
    default:
      return <input type='text' className={`${textBoxStyles} ${sharedStyle}`} {...rest as IInputProps} />;
  }
};

export default Input;
