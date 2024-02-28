import { useEffect, RefObject } from 'react';

const useFocusTrap = (
  isOpen: boolean,
  ref: RefObject<HTMLElement> | null,
  onClose: () => void,
  elementsToFocus: string,
) => {
  useEffect(() => {
    const trapFocus = (event: KeyboardEvent) => {
      if (!isOpen || !ref?.current) return;

      const focusableElements = ref.current.querySelectorAll(
        `${elementsToFocus}, [tabindex]:not([tabindex="-1"])`,
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }

      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', trapFocus);

    return () => {
      document.removeEventListener('keydown', trapFocus);
    };
  }, [isOpen, ref, onClose]);
};

export default useFocusTrap;
