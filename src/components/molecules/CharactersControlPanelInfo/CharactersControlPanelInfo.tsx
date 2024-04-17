import { CharactersControlPanelInfoItem } from '@/components/atoms/CharactersControlPanelInfoItem';
import {
  useControlPanelInputInfo,
  useCharactersContext,
} from '@/components/pages/Characters/hooks';

/**
 * A component that handles and displays information in a control panel.
 */
const CharactersControlPanelInfo = () => {
  const { charactersContextState, charactersContextDispatch } = useCharactersContext();

  const infoItems = useControlPanelInputInfo({
    describer: 'Results',
    searchInput: charactersContextState.searchString,
    order: charactersContextState.order,
    filters: charactersContextState.filters,
  });

  const handleClear = () => {
    charactersContextDispatch({ type: 'CLEAR_SEARCH' });
    charactersContextDispatch({ type: 'CLEAR_FILTERS' });
    charactersContextDispatch({ type: 'CLEAR_ORDER' });
  };

  const hasInfo = infoItems && infoItems?.length > 1;
  return (
    <>
      {hasInfo && (
        <div className='flex flex-col items-center justify-around gap-2 text-sm text-center text-white'>
          <p className='md:hidden'>
            {infoItems.map(({ type, prefix, name }) => (
              <CharactersControlPanelInfoItem key={name} type={type} prefix={prefix} name={name} />
            ))}{' '}
          </p>

          <button
            className='border border-white p-1 active-border focus-visible-border'
            onClick={handleClear}
          >
            CLEAR
          </button>
        </div>
      )}
    </>
  );
};

export default CharactersControlPanelInfo;
