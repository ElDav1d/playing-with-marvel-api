import Logo from '@/components/atoms/Logo/Logo';
import { Link } from 'react-router-dom';
import Container from '../Container';

const Footer = () => {
  return (
    <footer className='absolute bottom-0 w-full p-6 bg-stone-900' aria-label='common footer'>
      <Container>
        <Link to='/' className='block active focus-visible'>
          <Logo version={'condensed'} />
        </Link>
      </Container>
    </footer>
  );
};

export default Footer;
