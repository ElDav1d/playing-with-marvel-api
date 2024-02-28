import { useEffect, RefObject } from 'react';

/**
 * Props for the useFocusTrap custom hook.
 * @interface
 */
export interface IUseFocusTrapProps {
  /**
   * Indicates whether the element to trap is open.
   * @property {boolean}
   */
  isOpen: boolean;
  /**
   * Ref to the element to trap focus within.
   * @property {RefObject<HTMLElement> | null}
   */
  ref: RefObject<HTMLElement> | null;
  /**
   * Callback for closing the trapped element .
   * @property {() => void}
   */
  onClose: () => void;
  /**
   * CSS Selector for elements to focus within the trapped area.
   * @property {string}
   */
  elementsToFocus: string;
}

const useFocusTrap = ({ isOpen, ref, onClose, elementsToFocus }: IUseFocusTrapProps) => {
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
