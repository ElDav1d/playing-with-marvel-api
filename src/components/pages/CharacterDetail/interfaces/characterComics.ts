export interface ICharacterComicDetails {
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
  textObjects: ITextObject[];
  resourceURI: string;
  urls: IURL[];
  series: ISeries;
  variants: ISeries[];
  collections: unknown[];
  collectedIssues: ISeries[];
  dates: IDateElement[];
  prices: Price[];
  thumbnail: IThumbnail;
  images: IThumbnail[];
  creators: Creators;
  characters: ICharacters;
  stories: IStories;
  events: ICharacters;
}

export interface ICharacters {
  available: number;
  collectionURI: string;
  items: ISeries[];
  returned: number;
}

export interface ISeries {
  resourceURI: string;
  name: string;
}

export interface Creators {
  available: number;
  collectionURI: string;
  items: ICreatorsItem[];
  returned: number;
}

export interface ICreatorsItem {
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

export interface IDateElement {
  type: DateType;
  date: string;
}

export enum DateType {
  DigitalPurchaseDate = 'digitalPurchaseDate',
  FocDate = 'focDate',
  OnsaleDate = 'onsaleDate',
  UnlimitedDate = 'unlimitedDate',
}

export interface IThumbnail {
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

export interface IStories {
  available: number;
  collectionURI: string;
  items: IStoriesItem[];
  returned: number;
}

export interface IStoriesItem {
  resourceURI: string;
  name: string;
  type: ItemType;
}

export enum ItemType {
  Cover = 'cover',
  InteriorStory = 'interiorStory',
}

export interface ITextObject {
  type: string;
  language: string;
  text: string;
}

export interface IURL {
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
  TITLE_AZ = 'title',
  TITLE_ZA = '-title',
  ISSUE_NUMBER_FIRST = 'issueNumber',
  ISSUE_NUMBER_LAST = '-issueNumber',
}

export enum HumanizedOrder {
  'title' = 'by title (A/Z)',
  '-title' = 'by title (Z/A)',
  'issueNumber' = 'by issue number (First/Last)',
  '-issueNumber' = 'by issue humber (Last/First)',
}
