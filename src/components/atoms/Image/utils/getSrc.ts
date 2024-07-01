import { PicVariantName } from '../interfaces/image';
import orderSizing from './orderSizing';

const getSrc = (
  sizing: PicVariantName | PicVariantName[],
  path: string | undefined,
  extension: string,
): string => {
  const isSpecificSized = typeof sizing === 'string';
  const isSingleSized = Array.isArray(sizing) && sizing.length === 1;

  if (isSpecificSized) {
    return `${path}/${sizing}.${extension}`;
  } else if (isSingleSized) {
    return `${path}/${sizing[0]}.${extension}`;
  } else {
    const getBiggestPicPath = (picSizes: PicVariantName[]) => {
      return `${path}/${orderSizing(picSizes)[picSizes.length - 1]}.${extension}`;
    };

    return getBiggestPicPath(sizing);
  }
};

export default getSrc;
