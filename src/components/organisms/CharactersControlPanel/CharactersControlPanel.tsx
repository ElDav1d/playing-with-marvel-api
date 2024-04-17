import { CharactersCheckboxesList } from '@/components/molecules/CharactersCheckboxesList';
import { CharactersSelectGroup } from '@/components/molecules/CharactersSelectGroup';

import { CharactersSearchGroup } from '@/components/molecules/CharactersSearchGroup';

/**
 * Represents a control panel for managing characters.
 * @interface
 */
export interface ICharactersControlPanel {
  /**
   * @property {boolean}
   * Indicates viewport type (desktop or not).
   */
  isDesktop?: boolean;
}

const CharactersControlPanel = ({ isDesktop }: ICharactersControlPanel) => {
  const getStyles = () =>
    `${isDesktop ? 'hidden md:flex justify-center flex-wrap' : 'flex flex-col'}`;

  const getLabels = () =>
    isDesktop ? 'Desktop Characters List Control Panel' : 'Mobile Characters List Control Panel';

  return (
    <form className={`focus-within gap-4 ${getStyles()}`} aria-label={getLabels()}>
      <CharactersSearchGroup />
      <CharactersSelectGroup />
      <CharactersCheckboxesList />
    </form>
  );
};

export default CharactersControlPanel;
