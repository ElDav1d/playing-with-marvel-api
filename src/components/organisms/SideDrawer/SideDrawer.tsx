import { DialogOverlay } from '@/components/atoms/DialogOverlay';
import { useFocusTrap, useOutsideClick } from '@/hooks';
import { useEffect, useRef, useState } from 'react';

export interface ISideDrawerProps {
  /**
   * @property {string}
   * Additional class name for hidden container
   */
  classNameContainer?: string;
  /**
   * @property {string}
   * CSS Selector for HTML elements on focus trap
   */
  elementsToFocus: string;

  children: React.ReactNode;
}

const SideDrawer = ({ classNameContainer, elementsToFocus, children }: ISideDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  useOutsideClick(dialogRef, handleClose);

  useFocusTrap({ isOpen, ref: dialogRef, onClose: handleClose, elementsToFocus });

  useEffect(() => {
    if (isOpen) {
      closeButtonRef?.current?.focus();
    } else {
      openButtonRef?.current?.focus();
    }
  }, [isOpen]);

  return (
    <aside className='md:hidden'>
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

      {isOpen && <DialogOverlay />}

      <div
        ref={dialogRef}
        className={`absolute top-0 m-0 h-screen w-[80vw] z-1 px-8 py-11 transition-[left] delay-gridItem duration-gridItem ${
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
      </div>
    </aside>
  );
};

export default SideDrawer;
