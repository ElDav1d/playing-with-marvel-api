import { Link, useParams } from 'react-router-dom';
import useCharacter from '../../../services/useCharacterDetail';

const Character = () => {
  const { id } = useParams();
  const { character, isLoading, error } = useCharacter(id);

  const layout = isLoading ? <h2>Loading...</h2> : <h1>This is {character.name}</h1>;
  return (
    <>
      {error ? <h2>Ooops, try reloading again</h2> : layout}

      <Link to='/'>Home</Link>
    </>
  );
};

export default Character;
