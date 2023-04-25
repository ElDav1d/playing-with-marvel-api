type CriteriaConstants = {
  [key: string]: string[];
};

const BASE_URL = 'https://gateway.marvel.com:443/v1/public/characters';

const MAX_CHARACTERS = 10;

const CRITERIA: CriteriaConstants = {
  order: ['name', '-name', 'modified', '-modified'],
  filters: ['withDescription', 'withImage'],
};

export { BASE_URL, CRITERIA, MAX_CHARACTERS };
