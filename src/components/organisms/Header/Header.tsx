import Navigation from '@/components/molecules/NavigationMain';
import { useEffect, useRef, useState } from 'react';

export interface IHeaderProps {
  /**
   * @property
   * Additional class name for <header>
   */
  classNameHeader?: string;

  children?: React.ReactNode;
}

const Header = ({ classNameHeader, children }: IHeaderProps) => {
  const [onScrollDown, setOnScrollDown] = useState(false);

  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setOnScrollDown(true);
      } else if (currentScrollY < prevScrollY.current) {
        setOnScrollDown(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
