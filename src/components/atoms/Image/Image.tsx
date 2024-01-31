import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export interface ImageProps extends Thumbnail {
  variant: 'standard_small' | 'standard_fantastic' | 'landscape_incredible';
  className?: string;
  title: string;
  alt: string;
}

const Image = ({ path, extension, variant, className, title, alt }: ImageProps) => {
  const src = (variant: string) => `${path}/${variant}.${extension}`;

  return (
    <LazyLoadImage
      className={className}
      src={src(variant)}
      title={title}
      alt={alt}
      placeholderSrc={src('standard_small')}
      threshold={50}
      effect='blur'
    />
  );
};

export default Image;
