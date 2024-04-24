import {
  FetchingOrder,
  FilterCriteriaType,
  ICharactersInfoItem,
  HumanizedOrder,
  HumanizedFilterCriteria,
} from '@/components/pages/Characters/interfaces/characters';
import { useMemo } from 'react';

/**
 * Represents the properties used by the list control information hook.
 * @interface
 */
export interface IUseControlPanelInputInfo {
  /**
   * Info describer.
   * Inits dialog with user
   * @property {string}
   */
  describer: string;
  /**
   * The search input string.
   * @property {string}
   */
  searchInput: string;
  /**
   * The formatted string for fetching order.
   * @property {FetchingOrder}
   */
  order: FetchingOrder;
  /**
   * The filters to be applied.
   * @property {Record<FilterCriteriaType, boolean>}
   */
  filters: Record<FilterCriteriaType, boolean>;
}

const useControlPanelInputInfo = ({
  describer,
  searchInput,
  order,
  filters,
}: IUseControlPanelInputInfo) => {
  return useMemo(() => {
    const info: ICharactersInfoItem[] = [{ type: 'describer', name: describer }];
    const hasSearch = searchInput !== '';
    const hasFilters = Object.values(filters).some((filter) => filter === true);

    if (hasSearch) {
      info.push({ type: 'info', prefix: ' for ', name: searchInput });
    }

    if (hasSearch || hasFilters || order !== FetchingOrder.NAME_AZ) {
      info.push({ type: 'info', prefix: ' ordered ', name: HumanizedOrder[order] });
    }

    if (hasFilters) {
      const filterItems: ICharactersInfoItem[] = Object.entries(filters).reduce(
        (acc: ICharactersInfoItem[], [key, value], index) => {
          if (value === true) {
            const prefix = index === 0 ? ' with ' : ' and ';

            acc.push({
              type: 'info',
              prefix,
              name: HumanizedFilterCriteria[key as FilterCriteriaType],
            });
          }

          return acc;
        },
        [],
      );
      return [...info, ...filterItems] as ICharactersInfoItem[];
    }

    return info;
  }, [describer, searchInput, order, filters]);
};

export default useControlPanelInputInfo;
