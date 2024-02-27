export interface IInfoItem {
  type: 'describer' | 'info';
  prefix?: string;
  value: string;
}

export interface IControlPanelInfoProps {
  infoItems?: IInfoItem[];
  onClear?: () => void;
}

const getElement = (item: IInfoItem) => {
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

const ControlPanelInfo = ({ infoItems, onClear }: IControlPanelInfoProps) => {
  const hasInfo = infoItems && infoItems?.length > 1;
  return (
    <div className='flex flex-col items-center justify-around gap-2 text-sm text-center text-white'>
      {hasInfo && (
        // <p className='md:hidden'>{infoItems.map((item) => getElement(item))}</p>
        <p>{infoItems.map((item) => getElement(item))}</p>
      )}
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
