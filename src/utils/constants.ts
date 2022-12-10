type FetchingConstants = {
  [key: string]: string | number;
};

type CriteriaConstants = {
  [key: string]: string[];
};

const FETCHING_STRINGS: FetchingConstants = {
  BASE: 'https://gateway.marvel.com:443/v1/public/characters',
  KEY: 'd6f5c6bef1ef684786df6962910eb6ce',
};

const MAX_CHARACTERS = 5;

const CRITERIA: CriteriaConstants = {
  order: ['name', '-name', 'modified', '-modified'],
  filters: ['withDescription', 'withImage'],
};

export { FETCHING_STRINGS, CRITERIA, MAX_CHARACTERS };
