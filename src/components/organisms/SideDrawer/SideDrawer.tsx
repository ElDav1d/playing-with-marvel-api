import { useState } from 'react';

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

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='md:hidden'>
      {!isOpen && (
        <button
          aria-label='Open Characters List Control Panel'
          onClick={handleOpen}
          className='p-4 text-white'
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
          isOpen ? 'left-0' : 'left-[-100%]'
        } ${classNameContainer}`}
      >
        {isOpen && (
          <>
            <div className='flex flex-col gap-5'>{children}</div>
            <button
              aria-label='Close Characters List Control Panel'
              onClick={handleClose}
              className='absolute top-0 right-0'
            >
              <svg
                aria-hidden='true'
                className='h-8 w-8 text-gray-600'
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
    </div>
  );
};

export default SideDrawer;
