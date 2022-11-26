import { StyledImage } from './Image.style';
import { Thumbnail } from '../../../interfaces/globals';

export interface ImageProps extends Thumbnail {
  variant: 'standard_small' | 'landscape_incredible';
}

const Image = ({ path, extension, variant }: ImageProps) => {
  const src = `${path}/${variant}.${extension}`;
  return <StyledImage src={src} />;
};

export default Image;
