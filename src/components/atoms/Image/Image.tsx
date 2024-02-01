import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';
import { REGEX_IMAGE_PATH } from '@/utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export interface ImageProps extends Thumbnail {
  variant: 'standard_small' | 'standard_fantastic' | 'landscape_incredible';
  classNameContainer?: string;
  classNameContent?: string;
  title: string;
  alt: string;
  ariaId?: string;
}

const Image = ({
  path,
  extension,
  variant,
  classNameContainer,
  classNameContent,
  title,
  alt,
  ariaId,
}: ImageProps) => {
  const src = (variant: string) => `${path}/${variant}.${extension}`;
  const isNotAvailable = REGEX_IMAGE_PATH.test(path);

  return (
    <figure className={classNameContainer}>
      <LazyLoadImage
        className={classNameContent}
        src={src(variant)}
        title={title}
        alt={`${alt}${isNotAvailable ? ' is not available' : ''}`}
        id={ariaId}
        placeholderSrc={src('standard_small')}
        threshold={50}
        effect='blur'
      />
    </figure>
  );
};

export default Image;
