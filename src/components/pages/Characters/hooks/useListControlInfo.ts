import { useMemo } from 'react';
import { FetchingOrder, FilterCriteria } from '../interfaces/characters';

/**
 * Represents the properties used by the list control information hook.
 * @interface
 */
export interface IUseListControlInfo {
  /**
   * The search input string.
   * @property {string}
   */
  searchInput: string;
  /**
   * The fetching order for the list.
   * @property {FetchingOrder}
   */
  order: FetchingOrder;
  /**
   * An array of filter criteria.
   * @property {FilterCriteria[]}
   */
  filters: FilterCriteria[];
}

const useListControlInfo = ({ searchInput, order, filters }: IUseListControlInfo): string[] => {
  return useMemo(() => {
    const info = [];

    if (searchInput !== '') {
      info.push(`for ${searchInput}`);
    }
    if (order !== FetchingOrder.NAME_AZ) {
      info.push(`ordered by ${order}`);
    }
    if (filters.length > 0) {
      return [...info, ...filters];
    }

    return info;
  }, [searchInput, order, filters]);
};

export default useListControlInfo;
