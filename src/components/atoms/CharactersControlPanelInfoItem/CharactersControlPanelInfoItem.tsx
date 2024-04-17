import { ICharactersInfoItem } from '@/components/pages/Characters/interfaces/characters';

const CharactersControlPanelInfoItem = ({ type, prefix, name }: ICharactersInfoItem) => {
  return <span>{type === 'describer' ? name : `${prefix} ${name}`}</span>;
};

export default CharactersControlPanelInfoItem;
