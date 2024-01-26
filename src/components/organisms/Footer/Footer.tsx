import Logo from '@/components/atoms/Logo/Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='absolute bottom-0 w-full bg-red-800'>
      <Link to='/'>
        <Logo version={'condensed'} />
      </Link>
    </footer>
  );
};

export default Footer;
