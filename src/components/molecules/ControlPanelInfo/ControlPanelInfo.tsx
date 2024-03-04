/**
 * Represents an item in the ControlPanelInfo component.
 */
export interface IInfoItem {
  /**
   * The type of the item.
   */
  type: 'describer' | 'info';
  /**
   * The prefix of the item.
   */
  prefix?: string;
  /**
   * The value of the item.
   */
  value: string;
}

/**
 * Represents the props of the ControlPanelInfo component.
 */
export interface IControlPanelInfoProps {
  /**
   * An array of info items.
   */
  infoItems?: IInfoItem[];
  /**
   * A callback function to be called when the clear button is clicked.
   */
  onClear?: () => void;
}

/**
 * A component that displays information in a control panel.
 */
const ControlPanelInfo = ({ infoItems, onClear }: IControlPanelInfoProps) => {
  const getInfoContent = (item: IInfoItem) => {
    if (item.type === 'describer') {
      return <span key={item.value}>{item.value}</span>;
    } else {
      return (
        <span key={item.value}>
          {item.prefix}
          <strong> {item.value}</strong>
        </span>
      );
    }
  };

  const hasInfo = infoItems && infoItems?.length > 1;
  return (
    <div className='flex flex-col items-center justify-around gap-2 text-sm text-center text-white'>
      {hasInfo && <p className='md:hidden'>{infoItems.map((item) => getInfoContent(item))}</p>}
      {hasInfo && onClear && (
        <button
          className='border border-white p-1 active-border focus-visible-border'
          onClick={onClear}
        >
          CLEAR
        </button>
      )}
    </div>
  );
};

export default ControlPanelInfo;
