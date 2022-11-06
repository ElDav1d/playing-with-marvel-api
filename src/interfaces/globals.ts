export interface Thumbnail {
  path: string;
  extension: string;
}

export interface CharacterBase {
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

export interface CharacterItem extends CharacterBase {
  id: number;
  modified: string;
}
