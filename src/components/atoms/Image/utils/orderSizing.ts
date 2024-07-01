import { PicVariantName } from '../interfaces/image';
import { PIC_VARIANT_WIDTHS } from './constants';

const orderSizes = (sizes: PicVariantName[]): PicVariantName[] => {
  return sizes.sort((a, b) => {
    return PIC_VARIANT_WIDTHS[a] - PIC_VARIANT_WIDTHS[b];
  });
};

export default orderSizes;
