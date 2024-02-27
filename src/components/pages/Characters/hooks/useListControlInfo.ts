import { useMemo } from 'react';
import { HumanizedOrder, FilterCriteria, FetchingOrder } from '../interfaces/characters';
import { IInfoItem } from '@/components/molecules/ControlPanelInfo/ControlPanelInfo';

/**
 * Represents the properties used by the list control information hook.
 * @interface
 */
export interface IUseListControlInfoProps {
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
   * @property {HumanizedOrder}
   */
  order: HumanizedOrder;
  /**
   * An array of filter criteria.
   * @property {FilterCriteria[]}
   */
  filters: FilterCriteria[];
}

const useListControlInfo = ({
  describer,
  searchInput,
  order,
  filters,
}: IUseListControlInfoProps) => {
  return useMemo(() => {
    const info: IInfoItem[] = [{ type: 'describer', value: describer }];
    const hasSearch = searchInput !== '';
    const hasFilters = filters.length > 0;

    if (hasSearch) {
      info.push({ type: 'info', prefix: ' for ', value: searchInput });
    }

    if (hasSearch || hasFilters || order !== HumanizedOrder[FetchingOrder.NAME_AZ]) {
      info.push({ type: 'info', prefix: ' ordered ', value: order });
    }

    if (hasFilters) {
      const filterItems: IInfoItem[] = filters.map((filter, index) => {
        const prefix = index === 0 ? '' : ' and ';

        return { type: 'info', prefix, value: filter };
      });

      return [...info, ...filterItems] as IInfoItem[];
    }

    return info;
  }, [describer, searchInput, order, filters]);
};

export default useListControlInfo;
