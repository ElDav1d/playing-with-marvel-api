import CloseIcon from '@/components/atoms/CloseIcon/CloseIcon';
import { DialogOverlay } from '@/components/atoms/DialogOverlay';
import SearchIcon from '@/components/atoms/SearchIcon/SearchIcon';
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
          <SearchIcon />
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
              <CloseIcon />
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default SideDrawer;
