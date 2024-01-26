import Navigation from '@/components/molecules/Navigation/Navigation';
import React from 'react';

export interface IHeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return (
    <header className='bg-red-800'>
      <Navigation />
      {children}
    </header>
  );
};

export default Header;
