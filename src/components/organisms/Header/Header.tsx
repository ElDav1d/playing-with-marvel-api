import { NavigationMain } from '@/components/molecules/NavigationMain';
import { useScrollY } from '@/hooks';
import { getParentSelectors } from '@/utils/helpers';

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
      aria-label='common header'
      className={`w-full fixed z-1 top-0 flex justify-center transition-[transform] delay-s duration-m ${hideHeader()} bg-black ${getParentSelectors(
        classNameHeader,
      )}`}
    >
      <NavigationMain />
      {children}
    </header>
  );
};

export default Header;
