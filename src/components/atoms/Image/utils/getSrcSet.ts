import { PicVariantName } from '../interfaces/image';
import { PIC_VARIANT_WIDTHS } from './constants';
import orderSizing from './orderSizing';

const getSrcSet = (
  sizing: PicVariantName | PicVariantName[],
  path: string | undefined,
  extension: string,
): string | undefined => {
  const hasMultipleSizes = Array.isArray(sizing) && sizing.length > 1;

  if (hasMultipleSizes) {
    const uniquePicSizes = Array.from(new Set(sizing));

    if (uniquePicSizes.length > 1) {
      const getPathAndSize = (size: PicVariantName) =>
        `${path}/${size}.${extension} ${PIC_VARIANT_WIDTHS[size]}w`;

      return orderSizing(uniquePicSizes)
        .map((size) => getPathAndSize(size))
        .join(', ');
    }
  }

  return undefined;
};

export default getSrcSet;
