import { useEffect } from 'react';

const useDebounce = (value: string, delay: number, callback: () => void) => {
  let handler: NodeJS.Timeout;

  useEffect(() => {
    handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return () => handler && clearTimeout(handler);
};

export default useDebounce;
