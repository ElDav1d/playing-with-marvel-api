import Logo from '@/components/atoms/Logo/Logo';
import Container from '@/components/organisms/Container';
import { Link } from 'react-router-dom';

const NavigationMain = () => {
  return (
    <Container element={'nav'}>
      <Link to='/' className='block active focus-visible'>
        <h1 className='text-none'>
          Playing with Marvel API
          <Logo version={'default'} />
        </h1>
      </Link>
    </Container>
  );
};

export default NavigationMain;
