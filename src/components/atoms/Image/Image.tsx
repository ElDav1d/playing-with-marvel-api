import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';

export interface ImageProps extends Thumbnail {
  variant: 'standard_small' | 'standard_fantastic' | 'landscape_incredible';
}

const Image = ({ path, extension, variant }: ImageProps) => {
  const src = `${path}/${variant}.${extension}`;
  return <img src={src} />;
};

export default Image;
