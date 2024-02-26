export interface ICharactersControlInfoProps {
  infoCopy: string;
  infoItems?: string[];
  onClear?: () => void;
}

const CharactersControlInfo = ({ infoCopy, infoItems, onClear }: ICharactersControlInfoProps) => {
  return (
    <div className='flex flex-col items-center justify-around gap-2 text-sm text-center text-white'>
      {infoItems && infoItems.length > 0 && (
        <p className='md:hidden'>
          {infoCopy}
          {infoItems.map((item) => (
            <strong key={item}> {item}</strong>
          ))}
        </p>
      )}
      {infoItems && infoItems.length > 0 && onClear && (
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

export default CharactersControlInfo;
