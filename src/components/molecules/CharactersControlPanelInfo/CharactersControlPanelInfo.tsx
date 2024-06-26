import { CharactersControlPanelInfoItem } from '@/components/atoms/CharactersControlPanelInfoItem';
import { useCharactersContext } from '@/components/pages/Characters/hooks';
import { useControlPanelInputInfo } from './hooks';
import { useMediaQuery } from '@/hooks';
import { CLEAR_BUTTON_LITERAL, MEDIA_BREAKPOINTS } from '@/utils/constants';
import { Button } from 'eldav1d-marvel-ui';

/**
 * A component that handles and displays information in a control panel.
 */
const CharactersControlPanelInfo = () => {
  const { charactersContextState, charactersContextDispatch } = useCharactersContext();

  const isDesktop = useMediaQuery(`(min-width: ${MEDIA_BREAKPOINTS.MD}px)`);

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
          {!isDesktop && (
            <p>
              {infoItems.map(({ type, prefix, name }) => (
                <CharactersControlPanelInfoItem
                  key={name}
                  type={type}
                  prefix={prefix}
                  name={name}
                />
              ))}{' '}
            </p>
          )}

          <Button onClick={handleClear}>{CLEAR_BUTTON_LITERAL}</Button>
        </div>
      )}
    </>
  );
};

export default CharactersControlPanelInfo;
