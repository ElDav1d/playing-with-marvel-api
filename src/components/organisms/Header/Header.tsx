import Navigation from '@/components/molecules/NavigationMain';

export interface IHeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return (
    <header className='bg-black'>
      <Navigation />
      {children}
    </header>
  );
};

export default Header;
