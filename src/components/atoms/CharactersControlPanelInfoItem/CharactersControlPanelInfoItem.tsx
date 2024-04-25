import { ICharactersInfoItem } from '@/components/pages/Characters/interfaces/characters';

const CharactersControlPanelInfoItem = ({ type, prefix, name }: ICharactersInfoItem) => {
  return <>{type === 'describer' ? name : `${prefix} ${name}`}</>;
};

export default CharactersControlPanelInfoItem;
