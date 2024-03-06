export interface CharactersResults {
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
  results: CharacterItem[];
}

export interface CharacterItem {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Comics;
  stories: Stories;
  events: Comics;
  urls: URL[];
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: ComicsItem[];
  returned: number;
}

export interface ComicsItem {
  resourceURI: string;
  name: string;
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
  IMAGE = 'with image',
  DESCRIPTION = 'with description',
}

export type FilterCriteriaType = FilterCriteria.IMAGE | FilterCriteria.DESCRIPTION;
