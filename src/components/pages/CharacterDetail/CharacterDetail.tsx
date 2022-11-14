import { Link, useParams } from 'react-router-dom';
import Character from '../../organisms/Character/Character';
import useCharacterDetail from '../../../services/useCharacterDetail';

const CharacterDetail = () => {
  const { id } = useParams();
  const { characterData, isLoading, error } = useCharacterDetail(id);
  const { name, description, thumbnail, comics } = characterData;

  const layout = isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <Character name={name} description={description} thumbnail={thumbnail} comics={comics} />
  );

  return (
    <>
      {error ? <h2>Ooops, try reloading again</h2> : layout}
      <Link to='/'>Home</Link>
    </>
  );
};

export default CharacterDetail;
