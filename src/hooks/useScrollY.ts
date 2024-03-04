import { useEffect, useRef, useState } from 'react';

const useScrollY = () => {
  const [onScrollDown, setOnScrollDown] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScrollY = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setOnScrollDown(true);
      } else if (currentScrollY < prevScrollY.current) {
        setOnScrollDown(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScrollY);

    return () => {
      window.removeEventListener('scroll', handleScrollY);
    };
  }, []);

  return onScrollDown;
};

export default useScrollY;
