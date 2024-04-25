import { useEffect, useState } from 'react';

export type MediaQuery = '(min-width: 768px)';

const useMediaQuery = (query: MediaQuery): boolean => {
  const firstMatching = window.matchMedia(query).matches;

  const [isMatching, setIsMatching] = useState(firstMatching);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== isMatching) {
      setIsMatching(media.matches);
    }

    const listener = () => setIsMatching(media.matches);

    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else if (media.addListener) {
      media.addListener(listener);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else if (media.removeListener) {
        media.removeListener(listener);
      }
    };
  }, [isMatching, query]);

  return isMatching;
};

export default useMediaQuery;
