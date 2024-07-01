import { ResponsiveLazyImage } from 'eldav1d-marvel-ui';
import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';
import { BreakpointStepName } from '@/types/globals';
import { MEDIA_BREAKPOINTS } from '@/utils/constants';
import { PicVariantHeights, PicVariantName, PicVariantWidths } from './interfaces/image';

/* eslint-disable camelcase */
const PIC_VARIANT_WIDTHS: PicVariantWidths = {
  standard_small: 65,
  standard_xlarge: 200,
  standard_fantastic: 250,
  landscape_amazing: 250,
  landscape_incredible: 464,
};
/* eslint-enable camelcase */

/* eslint-disable camelcase */
const PIC_VARIANT_HEIGHTS: PicVariantHeights = {
  standard_small: 45,
  standard_xlarge: 200,
  standard_fantastic: 250,
  landscape_amazing: 156,
  landscape_incredible: 261,
};
/* eslint-enable camelcase */

const PIC_FALLBACK: Thumbnail = {
  path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
  extension: 'jpg',
};
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
  const LAZYLOAD_SIZING_DEFAULT = 'standard_small';
  const imageExtension = extension || PIC_FALLBACK.extension;

  const orderSizes = (sizes: PicVariantName[]) => {
    return sizes.sort((a, b) => {
      return PIC_VARIANT_WIDTHS[a] - PIC_VARIANT_WIDTHS[b];
    });
  };

  const getBiggestPicPath = (picSizes: PicVariantName[]) => {
    return `${path}/${orderSizes(picSizes)[picSizes.length - 1]}.${imageExtension}`;
  };

  const getSrc = (sizing: PicVariantName | PicVariantName[]) => {
    const isSpecificSized = typeof sizing === 'string';
    const isSingleSized = Array.isArray(sizing) && sizing.length === 1;

    if (isSpecificSized) {
      return `${path}/${sizing}.${imageExtension}`;
    } else if (isSingleSized) {
      return `${path}/${sizing[0]}.${imageExtension}`;
    } else {
      return getBiggestPicPath(sizing);
    }
  };

  const getSrcSet = () => {
    const hasMultipleSizes = Array.isArray(sizing) && sizing.length > 1;

    if (hasMultipleSizes) {
      const uniquePicSizes = Array.from(new Set(sizing));

      if (uniquePicSizes.length > 1) {
        const getPathAndSize = (size: PicVariantName) =>
          `${path}/${size}.${imageExtension} ${PIC_VARIANT_WIDTHS[size]}w`;

        return orderSizes(uniquePicSizes)
          .map((size) => getPathAndSize(size))
          .join(', ');
      }
    }

    return undefined;
  };

  const getBreakpointSizes = (sizing: PicVariantName | PicVariantName[]) => {
    const hasSingleSize =
      typeof sizing === 'string' ||
      (Array.isArray(sizing) && (sizing.length <= 1 || new Set(sizing).size === 1));

    if (hasSingleSize) {
      return undefined;
    }

    const uniqueSizes = Array.from(new Set(sizing));
    const breakpointKeys = Object.keys(MEDIA_BREAKPOINTS);

    const sizes = uniqueSizes.map((size, i) => {
      const width = `${PIC_VARIANT_WIDTHS[size]}px`;
      const isNotLastSize = i < breakpointKeys.length && i < uniqueSizes.length - 1;

      if (isNotLastSize) {
        const step = breakpointKeys[i] as BreakpointStepName;
        return `(max-width: ${MEDIA_BREAKPOINTS[step]}px) ${width}`;
      } else {
        return width;
      }
    });

    return sizes.join(', ');
  };

  return (
    <ResponsiveLazyImage
      title={title}
      alt={alt}
      ariaId={ariaId}
      classNameContainer={classNameContainer}
      classNameContent={classNameContent}
      isAvailable={!path?.includes('image_not_available')}
      path={getSrc(sizing)}
      fallback={`${PIC_FALLBACK.path}.${PIC_FALLBACK.extension}`}
      lazyFallback={getSrc(LAZYLOAD_SIZING_DEFAULT)}
      srcSet={getSrcSet()}
      sizes={getBreakpointSizes(sizing)}
    />
  );
};

export default Image;
