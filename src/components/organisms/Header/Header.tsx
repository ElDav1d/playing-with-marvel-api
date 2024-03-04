import Navigation from '@/components/molecules/NavigationMain';
import { useScrollY } from '@/hooks';

export interface IHeaderProps {
  /**
   * @property
   * Additional class name for <header>
   */
  classNameHeader?: string;

  children?: React.ReactNode;
}

const Header = ({ classNameHeader, children }: IHeaderProps) => {
  const onScrollDown = useScrollY();

  const hideHeader = () => (onScrollDown ? '-translate-y-full' : '');

  return (
    <header
      className={`w-full fixed z-1 top-0 transition-[transform] delay-gridItem duration-header ${hideHeader()} bg-black ${classNameHeader}`}
    >
      <Navigation />
      {children}
    </header>
  );
};

export default Header;
