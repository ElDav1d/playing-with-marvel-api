import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';
import { BreakpointStepName } from '@/interfaces/globals';
import { MEDIA_BREAKPOINTS, REGEX_IMAGE_PATH } from '@/utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * @typedef
 * Type for picture size variants
 */
export type PicVariant =
  | 'standard_small'
  | 'standard_xlarge'
  | 'standard_fantastic'
  | 'landscape_incredible';

/**
 * @interface ImageProps
 * @extends {Thumbnail}
 *
 */
export interface ImageProps extends Thumbnail {
  /**
   * @property
   * Size variant(s) of the picture
   * A single image URL
   * for single image approach
   * or an array of image URL
   * for art direction
   */
  sizing: PicVariant | PicVariant[];
  /**
   * @property
   * CSS class name for <picture>.
   */
  classNameContainer?: string;
  /**
   * @property
   * CSS class name for <img>
   * wrapped with <LazyLoadImage>
   */
  classNameContent?: string;
  /**
   * @property
   * Image title
   * appears on tooltip
   */
  title: string;
  /**
   * @property
   * Image alt text
   * applies on screenreaders
   */
  alt: string;
  /**
   * @property
   * ID for accesibility purposes
   * applied on external tag
   * aria-labelledby attribute
   */
  ariaId?: string;
}

const Image = ({
  path,
  extension,
  sizing,
  classNameContainer,
  classNameContent,
  title,
  alt,
  ariaId,
}: ImageProps) => {
  const LAZYLOAD_SIZING_DEFAULT = 'standard_small';

  const getSrc = (sizing: PicVariant | PicVariant[]) => {
    if (typeof sizing === 'string') {
      return `${path}/${sizing}.${extension}`;
    }
    return `${path}/${sizing[0]}.${extension}`;
  };

  const getSrcSet = () => {
    if (Array.isArray(sizing) && sizing.length > 1) {
      const uniqueValues = [new Set(sizing)];

      if (uniqueValues.length > 1) {
        return `${path}/${uniqueValues[1]}.${extension}`;
      }
    }
    return '';
  };

  const getBreakpointSizes = () => {
    let sizes = '';

    for (const step in MEDIA_BREAKPOINTS) {
      sizes = `${sizes} (min-width: ${MEDIA_BREAKPOINTS[step as BreakpointStepName]}px)`;
    }

    return sizes;
  };

  const isNotAvailable = REGEX_IMAGE_PATH.test(path);

  return (
    <picture className={classNameContainer}>
      <LazyLoadImage
        className={classNameContent}
        sizes={getBreakpointSizes()}
        srcSet={getSrcSet()}
        src={getSrc(sizing)}
        title={title}
        alt={`${alt}${isNotAvailable ? ' is not available' : ''}`}
        id={ariaId}
        placeholderSrc={getSrc(LAZYLOAD_SIZING_DEFAULT)}
        threshold={50}
        effect='blur'
      />
    </picture>
  );
};

export default Image;
