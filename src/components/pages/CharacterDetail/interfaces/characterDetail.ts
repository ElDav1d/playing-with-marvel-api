export interface ICharacterDetail {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: IThumbnail;
  resourceURI: string;
  comics: IComics;
  series: IComics;
  stories: IStories;
  events: IComics;
  urls: IURL[];
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
  type: string;
}

export interface IThumbnail {
  path: string;
  extension: string;
}

export interface IURL {
  type: string;
  url: string;
}
