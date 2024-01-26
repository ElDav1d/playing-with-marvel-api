import Logo from '@/components/atoms/Logo/Logo';
import { Link } from 'react-router-dom';

const NavigationMain = () => {
  return (
    <nav>
      <Link to='/'>
        <h1 className='text-none'>
          Playing with Marvel API
          <Logo version={'default'} />
        </h1>
      </Link>
    </nav>
  );
};

export default NavigationMain;
