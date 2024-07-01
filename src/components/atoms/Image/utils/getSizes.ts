import { BreakpointStepName } from '@/types/globals';
import { MEDIA_BREAKPOINTS } from '@/utils/constants';
import { PicVariantName } from '../interfaces/image';
import { PIC_VARIANT_WIDTHS } from './constants';

const getSizes = (sizing: PicVariantName | PicVariantName[]): string | undefined => {
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

export default getSizes;
