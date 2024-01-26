import Logo from '@/components/atoms/Logo/Logo';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to='/'>
        <Logo />
      </Link>
    </nav>
  );
};

export default Navigation;
