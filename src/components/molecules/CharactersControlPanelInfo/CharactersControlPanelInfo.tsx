import { useControlPanelInputInfo, useFiltersContext } from '@/components/pages/Characters/hooks';
import { FetchingOrder } from '@/components/pages/Characters/interfaces/characters';

/**
 * Represents an item in the CharactersControlPanelInfo component.
 */
export interface IInfoItem {
  /**
   * The type of the item.
   */
  type: 'describer' | 'info';
  /**
   * The prefix of the item
   * to be appended before the value.
   */
  prefix?: string;
  /**
   * The name of the item.
   */
  name: string;
}

/**
 * Represents the props of the CharactersControlPanelInfo component.
 */
export interface ICharactersControlPanelInfoProps {
  /**
   * The search input value.
   * @default ''
   * @type {string}
   */
  searchInput: string;
  /**
   * The current fetching order.
   * @type {FetchingOrder}
   */
  order: FetchingOrder;
  /**
   * A callback function to be called when the clear button is clicked.
   */
  onClear?: () => void;
}

/**
 * A component that displays information in a control panel.
 */
const CharactersControlPanelInfo = ({
  searchInput,
  order,
  onClear,
}: ICharactersControlPanelInfoProps) => {
  const { filters, clearFilters } = useFiltersContext();

  const infoItems = useControlPanelInputInfo({
    describer: 'Results',
    searchInput,
    order,
    filters,
  });

  const getInfoElements = (item: IInfoItem) => {
    if (item.type === 'describer') {
      return <span key={item.name}>{item.name}</span>;
    } else {
      return (
        <span key={item.name}>
          {item.prefix}
          <strong> {item.name}</strong>
        </span>
      );
    }
  };

  const handleClick = () => {
    onClear && onClear();
    clearFilters();
  };

  const hasInfo = infoItems && infoItems?.length > 1;
  return (
    <>
      {hasInfo && (
        <div className='flex flex-col items-center justify-around gap-2 text-sm text-center text-white'>
          {hasInfo && <p className='md:hidden'>{infoItems.map((item) => getInfoElements(item))}</p>}
          {hasInfo && onClear && (
            <button
              className='border border-white p-1 active-border focus-visible-border'
              onClick={handleClick}
            >
              CLEAR
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CharactersControlPanelInfo;
