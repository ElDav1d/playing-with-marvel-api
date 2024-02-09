import Navigation from '@/components/molecules/NavigationMain';

export interface IHeaderProps {
  /**
   * @property
   * Additional class name for <header>
   */
  classNameHeader?: string;

  children?: React.ReactNode;
}

const Header = ({ classNameHeader, children }: IHeaderProps) => {
  return (
    <header className={`bg-black ${classNameHeader}`}>
      <Navigation />
      {children}
    </header>
  );
};

export default Header;
