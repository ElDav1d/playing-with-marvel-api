/* eslint-disable quotes */
import { useOutsideClick } from '@/hooks';
import { useEffect, useRef, useState } from 'react';

export interface ISideDrawerProps {
  /**
   * @property {string}
   * Additional class name for hidden container
   */
  classNameContainer?: string;

  children?: React.ReactNode;
}

const SideDrawer = ({ classNameContainer, children }: ISideDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const sideDrawerRef = useOutsideClick(handleClose);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef?.current?.focus();

      const sideDraweElement = sideDrawerRef.current;

      const focusableElements = sideDraweElement?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTabKeyPress = (event: KeyboardEvent) => {
          if (event.key === 'Tab') {
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        };

        const handleEscapeKeyPress = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            setIsOpen(false);
          }
        };

        sideDraweElement?.addEventListener('keydown', handleTabKeyPress);
        sideDraweElement?.addEventListener('keydown', handleEscapeKeyPress);

        return () => {
          sideDraweElement?.removeEventListener('keydown', handleTabKeyPress);
          sideDraweElement?.removeEventListener('keydown', handleEscapeKeyPress);
        };
      }
    } else {
      openButtonRef?.current?.focus();
    }
  }, [isOpen, setIsOpen]);

  return (
    <aside ref={sideDrawerRef} className='md:hidden'>
      {!isOpen && (
        <button
          aria-label='Open Characters List Control Panel'
          onClick={handleOpen}
          className='absolute top-0 right-0 m-1 p-3 text-white focus-visible'
          ref={openButtonRef}
        >
          <svg
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            width='19'
            height='17'
            viewBox='0 0 19 17'
            stroke='white'
            strokeWidth='2'
            fillRule='evenodd'
          >
            <title>Search icon</title>
            <desc>Magnifying glass illustration</desc>
            <circle cx='6.5' cy='6.5' r='5.5'></circle>
            <path d='M14 14l3.536 3.536'></path>
          </svg>
        </button>
      )}
      <dialog
        open={isOpen}
        className={`absolute block top-0 m-0 h-full w-[80vw] z-1 px-8 py-11 transition-[left] delay-gridItem duration-gridItem ${
          isOpen ? 'left-0' : 'left-[-100%]'
        } ${classNameContainer}`}
      >
        {isOpen && (
          <>
            {children}
            <button
              aria-label='Close Characters List Control Panel'
              onClick={handleClose}
              className='absolute top-0 right-0 m-1 p-1 focus-visible'
              ref={closeButtonRef}
            >
              <svg
                aria-hidden='true'
                className='h-6 w-6 text-white'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <title>Close icon</title>
                <desc>Two crossed strokes</desc>
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>
          </>
        )}
      </dialog>
    </aside>
  );
};

export default SideDrawer;
