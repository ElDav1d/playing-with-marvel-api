import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';
import { BreakpointStepName } from '@/types/globals';
import { MEDIA_BREAKPOINTS, REGEX_IMAGE_PATH } from '@/utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Image.css';

/**
 * @typedef
 * Type for picture size variants
 */
export type PicVariantName =
  | 'standard_small'
  | 'standard_xlarge'
  | 'standard_fantastic'
  | 'landscape_amazing'
  | 'landscape_incredible';

/**
 * @typedef
 * Type for picture width size values
 * in pixels for each variant
 *  */
export type PicVariantWidthValue = 65 | 200 | 250 | 464;

export type PicVariantWidths = {
  [key in PicVariantName]: PicVariantWidthValue;
};

/* eslint-disable camelcase */
const PIC_VARIANT_WIDTHS: PicVariantWidths = {
  standard_small: 65,
  standard_xlarge: 200,
  standard_fantastic: 250,
  landscape_amazing: 250,
  landscape_incredible: 464,
};
/* eslint-enable camelcase */

/**
 * @interface ImageProps
 * @extends {Thumbnail}
 *
 */
export interface ImageProps extends Thumbnail {
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
  const LAZYLOAD_THRESHOLD = 50;

  const orderSizes = (sizes: PicVariantName[]) => {
    return sizes.sort((a, b) => {
      return PIC_VARIANT_WIDTHS[a] - PIC_VARIANT_WIDTHS[b];
    });
  };

  const getSrc = (sizing: PicVariantName | PicVariantName[]) => {
    if (typeof sizing === 'string') {
      return `${path}/${sizing}.${extension}`;
    }

    if (Array.isArray(sizing) && sizing.length === 1) {
      return `${path}/${sizing[0]}.${extension}`;
    }

    const getBiggestPic = (picSizes: PicVariantName[]) => {
      return `${path}/${orderSizes(picSizes)[picSizes.length - 1]}.${extension}`;
    };

    return getBiggestPic(sizing);
  };

  const getSrcSet = () => {
    const hasMultipleSizes = Array.isArray(sizing) && sizing.length > 1;

    if (hasMultipleSizes) {
      const uniquePicSizes = Array.from(new Set(sizing));

      if (uniquePicSizes.length > 1) {
        const getPathAndSize = (size: PicVariantName) =>
          `${path}/${size}.${extension} ${PIC_VARIANT_WIDTHS[size]}w`;

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

  const getAltText = () => {
    if (REGEX_IMAGE_PATH.test(path)) {
      return `${alt}' is not available`;
    }
    return alt;
  };

  return (
    <picture className={classNameContainer}>
      <LazyLoadImage
        wrapperClassName='w-full'
        className={`w-full ${classNameContent}`}
        srcSet={getSrcSet()}
        sizes={getBreakpointSizes(sizing)}
        src={getSrc(sizing)}
        title={title}
        alt={getAltText()}
        id={ariaId}
        placeholderSrc={getSrc(LAZYLOAD_SIZING_DEFAULT)}
        threshold={LAZYLOAD_THRESHOLD}
        effect='blur'
      />
    </picture>
  );
};

export default Image;
