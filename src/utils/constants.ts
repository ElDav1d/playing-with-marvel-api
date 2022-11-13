type FetchingValue = string;
type FetchingConstants = {
  [key: string]: FetchingValue;
};

const FETCHING: FetchingConstants = {
  BASE: 'https://gateway.marvel.com:443/v1/public/characters',
  KEY: 'd6f5c6bef1ef684786df6962910eb6ce',
};

export { FETCHING };
