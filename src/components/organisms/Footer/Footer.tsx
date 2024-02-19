import Logo from '@/components/atoms/Logo/Logo';
import { Link } from 'react-router-dom';
import Container from '../Container';

const Footer = () => {
  return (
    <footer className='absolute bottom-0 w-full p-6 bg-stone-900'>
      <Container>
        <Link className='block focus-visible' to='/'>
          <Logo version={'condensed'} />
        </Link>
      </Container>
    </footer>
  );
};

export default Footer;
