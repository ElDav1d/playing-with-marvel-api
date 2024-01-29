import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';

export interface ImageProps extends Thumbnail {
  variant: 'standard_small' | 'standard_fantastic' | 'landscape_incredible';
  className?: string;
}

const Image = ({ path, extension, variant, className }: ImageProps) => {
  const src = `${path}/${variant}.${extension}`;
  return <img src={src} className={className} />;
};

export default Image;
