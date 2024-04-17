export interface ICharacterItem {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: IComics;
  series: IComics;
  stories: IStories;
  events: IComics;
  urls: URL[];
}

export interface IComics {
  available: number;
  collectionURI: string;
  items: IComicsItem[];
  returned: number;
}

export interface IComicsItem {
  resourceURI: string;
  name: string;
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
  type: Type;
}

export enum Type {
  Cover = 'cover',
  InteriorStory = 'interiorStory',
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface URL {
  type: string;
  url: string;
}

export enum FetchingOrder {
  NAME_AZ = 'name',
  NAME_ZA = '-name',
  MODIFIED_FIRST = 'modified',
  MODIFIED_LAST = '-modified',
}

export enum HumanizedOrder {
  'name' = 'by name (A/Z)',
  '-name' = 'by name (Z/A)',
  'modified' = 'by modification (First/Last)',
  '-modified' = 'by modification (Last/First)',
}

export enum FilterCriteria {
  IMAGE = 'withImage',
  DESCRIPTION = 'withDescription',
}

export enum HumanizedFilterCriteria {
  'withImage' = 'with image',
  'withDescription' = 'with description',
}

export type FilterCriteriaType = FilterCriteria.IMAGE | FilterCriteria.DESCRIPTION;

export interface ICharactersInfoItem {
  type: 'describer' | 'info';
  prefix?: string;
  name: string;
}
