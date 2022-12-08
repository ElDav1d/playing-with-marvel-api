import { useState, useRef, Ref, useEffect } from 'react';

export interface InterSectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

const useIntersectionObserver = <T = HTMLLIElement>({
  root = null,
  rootMargin,
  threshold = 0,
}: InterSectionObserverProps): [Ref<T>, IntersectionObserverEntry | undefined] => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<Element | null>(null);

  const observer = useRef(
    new window.IntersectionObserver(([firstEntry]) => setEntry(firstEntry), {
      root,
      rootMargin,
      threshold,
    }),
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode as unknown as Ref<T>, entry];
};

export default useIntersectionObserver;
