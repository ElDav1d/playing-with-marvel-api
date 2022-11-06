import { Link, useParams } from 'react-router-dom'
import { CharacterBase } from '../../../interfaces/globals';

export interface ComicItem {
  resourceUri: string;
  name: string;
}

export interface CharacterComics {
  items: ComicItem[];
}

export interface CharacterDetail extends CharacterBase {
  comics: CharacterComics;
}

const Character = () => {
  const { id, name } = useParams();
  return (
    <>
      <h1>This is {name}</h1>
			<Link to='/'>Home</Link>
    </>
  );
};

export default Character;
