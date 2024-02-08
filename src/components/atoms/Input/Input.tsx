export interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  isSelect?: false;
  className?: string;
}

export interface ISelectProps extends React.ComponentPropsWithoutRef<'select'> {
  isSelect?: true;
  children?: React.ReactNode;
  className?: string;
}

const Input = ({ className, isSelect, ...rest }: IInputProps | ISelectProps) => {
  const style = `bg-black border-white shadow appearance-none border w-full py-2 px-3 focus:border-red focus:outline-double focus:outline-red ${className}`;

  if (isSelect) {
    const selectProps = rest as ISelectProps;
    return <select className={style} {...selectProps} />;
  } else {
    const inputProps = rest as IInputProps;
    return <input className={style} {...inputProps} />;
  }
};

export default Input;
