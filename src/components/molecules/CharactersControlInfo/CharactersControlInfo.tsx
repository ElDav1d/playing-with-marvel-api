export interface ICharactersControlInfoProps {
  infoCopy: string;
  infoItems?: string[];
  onClear?: () => void;
}

const CharactersControlInfo = ({ infoCopy, infoItems, onClear }: ICharactersControlInfoProps) => {
  return (
    <div className='my-8 text-sm text-center text-white'>
      {infoItems && infoItems.length > 0 && (
        <p className='mb-2'>
          {infoCopy}
          {infoItems.map((item) => (
            <strong key={item}> {item}</strong>
          ))}
        </p>
      )}
      {onClear && (
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
