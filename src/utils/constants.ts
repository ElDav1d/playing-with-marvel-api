type FetchingConstants = {
  [key: string]: string;
};

type CriteriaConstants = {
  [key: string]: string[];
};

const FETCHING: FetchingConstants = {
  BASE: 'https://gateway.marvel.com:443/v1/public/characters',
  KEY: 'd6f5c6bef1ef684786df6962910eb6ce',
};

const CRITERIA: CriteriaConstants = {
  order: ['name', '-name', 'modified', '-modified'],
  filters: ['withDescription', 'withImage'],
};

export { FETCHING, CRITERIA };
