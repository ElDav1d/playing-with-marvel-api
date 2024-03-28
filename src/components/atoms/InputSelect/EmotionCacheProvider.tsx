import '@/index.css';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useMemo } from 'react';

const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const titleElement = document.querySelector('title');

  if (!titleElement) {
    throw new Error('No <title> element found in document');
  }

  const cache = useMemo(
    () =>
      createCache({
        key: 'with-tailwind',
        insertionPoint: titleElement,
      }),
    [],
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default EmotionCacheProvider;
