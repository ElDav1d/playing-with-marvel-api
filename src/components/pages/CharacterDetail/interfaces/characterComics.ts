export interface CharactersComics {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data;
}

export interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CharacterComicDetails[];
}

export interface CharacterComicDetails {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: VariantDescription;
  description: null | string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: URL[];
  series: Series;
  variants: Series[];
  collections: unknown[];
  collectedIssues: Series[];
  dates: DateElement[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Thumbnail[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Characters;
}

export interface Characters {
  available: number;
  collectionURI: string;
  items: Series[];
  returned: number;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface Creators {
  available: number;
  collectionURI: string;
  items: CreatorsItem[];
  returned: number;
}

export interface CreatorsItem {
  resourceURI: string;
  name: string;
  role: Role;
}

export enum Role {
  Artist = 'artist',
  Colorist = 'colorist',
  ColoristCover = 'colorist (cover)',
  Editor = 'editor',
  Inker = 'inker',
  Letterer = 'letterer',
  Penciler = 'penciler',
  PencilerCover = 'penciler (cover)',
  Penciller = 'penciller',
  PencillerCover = 'penciller (cover)',
  Writer = 'writer',
}

export interface DateElement {
  type: DateType;
  date: string;
}

export enum DateType {
  DigitalPurchaseDate = 'digitalPurchaseDate',
  FocDate = 'focDate',
  OnsaleDate = 'onsaleDate',
  UnlimitedDate = 'unlimitedDate',
}

export interface Thumbnail {
  path: string;
  extension: Extension;
}

export enum Extension {
  Jpg = 'jpg',
}

export interface Price {
  type: PriceType;
  price: number;
}

export enum PriceType {
  PrintPrice = 'printPrice',
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: StoriesItem[];
  returned: number;
}

export interface StoriesItem {
  resourceURI: string;
  name: string;
  type: ItemType;
}

export enum ItemType {
  Cover = 'cover',
  InteriorStory = 'interiorStory',
}

export interface TextObject {
  type: string;
  language: string;
  text: string;
}

export interface URL {
  type: URLType;
  url: string;
}

export enum URLType {
  Detail = 'detail',
  Purchase = 'purchase',
  Reader = 'reader',
}

export enum VariantDescription {
  Empty = '',
  TurnerVariant = 'Turner Variant',
}

export enum FetchingOrder {
  FOC_DATE_FIRST = 'focDate',
  FOC_DATE_LAST = '-focDate',
  ONSALE_DATE_FIRST = 'onsaleDate',
  ONSALE_DATE_LAST = '-onsaleDate',
  TITLE_AZ = 'title',
  TITLE_ZA = '-title',
  ISSUE_NUMBER_FIRST = 'issueNumber',
  ISSUE_NUMBER_LAST = '-issueNumber',
  MODIFIED_FIRST = 'modified',
  MODIFIED_LAST = '-modified',
}
