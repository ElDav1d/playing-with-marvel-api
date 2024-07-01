import { Thumbnail } from '@/components/pages/Characters/interfaces/characters';
import { PicVariantWidths, PicVariantHeights } from '../interfaces/image';

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

const LAZYLOAD_SIZING_DEFAULT = 'standard_small';

export { PIC_VARIANT_WIDTHS, PIC_VARIANT_HEIGHTS, PIC_FALLBACK, LAZYLOAD_SIZING_DEFAULT };
