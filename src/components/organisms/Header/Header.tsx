import Navigation from '@/components/molecules/NavigationMain';

export interface IHeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: IHeaderProps) => {
  return (
    <header className='mb-6 bg-black text-white'>
      <Navigation />
      {children}
    </header>
  );
};

export default Header;