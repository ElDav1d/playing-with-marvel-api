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

/**
 * @typedef
 * Type for picture height size values
 * in pixels for each variant
 *  */
export type PicVariantHeightValue = 45 | 200 | 250 | 156 | 261;

export type PicVariantHeights = {
  [key in PicVariantName]: PicVariantHeightValue;
};
