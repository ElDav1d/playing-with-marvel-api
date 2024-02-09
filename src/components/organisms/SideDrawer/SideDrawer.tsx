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
    <>
      {!isOpen && (
        <span onClick={handleOpen} className='p-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='19'
            height='17'
            viewBox='0 0 19 17'
            stroke='white'
            strokeWidth='2'
            fillRule='evenodd'
          >
            <circle cx='6.5' cy='6.5' r='5.5'></circle>
            <path d='M14 14l3.536 3.536'></path>
          </svg>
        </span>
      )}

      {isOpen && (
        <div
          className={`absolute top-0 left-0 h-lvh w-[80vw] z-10 px-8 py-8 ${classNameContainer}`}
        >
          <div>{children}</div>
          <span onClick={handleClose} className='absolute top-0 right-0'>
            <svg
              className='h-8 w-8 text-gray-600'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </span>
        </div>
      )}
    </>
  );
};

export default SideDrawer;
