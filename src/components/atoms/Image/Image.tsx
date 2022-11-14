import { StyledImage } from './Image.style';
import { Thumbnail } from '../../../interfaces/globals';

const Image = ({ path, extension }: Thumbnail) => {
  const VARIANT = 'standard_small';
  const src = `${path}/${VARIANT}.${extension}`;
  return <StyledImage src={src} />;
};

export default Image;
