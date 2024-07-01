import { ResponsiveLazyImage } from 'eldav1d-marvel-ui';
import { PicVariantName } from './interfaces/image';
import { LAZYLOAD_SIZING_DEFAULT, PIC_FALLBACK } from './utils/constants';
import { getSizes, getSrc, getSrcSet } from './utils';

/**
 * @interface ImageProps
 * @extends {Thumbnail}
 *
 */
export interface ImageProps {
  /**
   * @property {string}
   * Image path
   */
  path: string | undefined;
  /**
   * @property {string}
   * Image extension
   */
  extension: string | undefined;
  /**
   * @property {PicVariant | PicVariant[]}
   * Size variant(s) of the picture
   * Single image URL
   * for single image approach
   * Array of image URL
   * for art direction
   */
  sizing: PicVariantName | PicVariantName[];
  /**
   * @property {string}
   * Additional class name for <picture>.
   */
  classNameContainer?: string;
  /**
   * @property {string}
   * Additional class name for <img>
   */
  classNameContent?: string;
  /**
   * @property {string}
   * Image title
   * appears on tooltip
   */
  title: string;
  /**
   * @property {string}
   * Image alt text
   * applies on screenreaders
   */
  alt: string;
  /**
   * @property {string}
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
  const imageExtension = extension || PIC_FALLBACK.extension;

  return (
    <ResponsiveLazyImage
      title={title}
      alt={alt}
      ariaId={ariaId}
      classNameContainer={classNameContainer}
      classNameContent={classNameContent}
      isAvailable={!path?.includes('image_not_available')}
      path={getSrc(sizing, path, imageExtension)}
      fallback={`${PIC_FALLBACK.path}.${PIC_FALLBACK.extension}`}
      lazyFallback={getSrc(LAZYLOAD_SIZING_DEFAULT, path, imageExtension)}
      srcSet={getSrcSet(sizing, path, imageExtension)}
      sizes={getSizes(sizing)}
    />
  );
};

export default Image;
