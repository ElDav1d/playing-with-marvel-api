import React from 'react';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return (
    <header className='bg-red-800'>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
      {children}
    </header>
  );
};

export default Header;
