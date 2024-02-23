import { FetchingOrder, FilterCriteria } from '@/components/pages/Characters/interfaces/characters';

export interface ICharactersControlInfoProps {
  searchInput?: string;
  filters?: FilterCriteria[];
  order?: FetchingOrder;
  onClear: () => void;
}

const CharactersControlInfo = ({
  searchInput,
  filters,
  order,
  onClear: handleClear,
}: ICharactersControlInfoProps) => {
  return (
    <div className='my-3 text-sm text-center text-white'>
      <p className='mb-2'>
        Results for
        {searchInput && <strong> {searchInput}</strong>}
        {filters && <strong> {filters}</strong>}
        {order && <strong> {order}</strong>}
      </p>
      <button
        className='border border-white p-1 active-border focus-visible-border'
        onClick={handleClear}
      >
        CLEAR
      </button>
    </div>
  );
};

export default CharactersControlInfo;
