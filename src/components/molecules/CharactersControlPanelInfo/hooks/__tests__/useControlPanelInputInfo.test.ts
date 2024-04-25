import { renderHook } from '@testing-library/react';
import useControlPanelInputInfo from '../useControlPanelInputInfo';
import { FetchingOrder, HumanizedOrder } from '@/components/pages/Characters/interfaces/characters';

it('should include correct search info when search input is provided', () => {
  // ARRANGE
  const describerItem = { name: 'Test', type: 'describer' };

  const searchInput = 'Spiderman';

  const nameItem = { name: searchInput, prefix: ' for ', type: 'info' };

  const orderItem = {
    name: HumanizedOrder[FetchingOrder.NAME_AZ],
    prefix: ' ordered ',
    type: 'info',
  };

  // ACT
  const { result } = renderHook(() =>
    useControlPanelInputInfo({
      describer: 'Test',
      searchInput: searchInput,
      order: FetchingOrder.NAME_AZ,
      filters: {
        withImage: false,
        withDescription: false,
      },
    }),
  );

  // ASSERT
  expect(result.current).toEqual([describerItem, nameItem, orderItem]);
});

it('should include correct order info when order is not NAME_AZ', () => {
  // ARRANGE
  const describerItem = { name: 'Test', type: 'describer' };

  const searchInput = '';

  const orderItem = {
    name: HumanizedOrder[FetchingOrder.NAME_ZA],
    prefix: ' ordered ',
    type: 'info',
  };

  // ACT
  const { result } = renderHook(() =>
    useControlPanelInputInfo({
      describer: 'Test',
      searchInput,
      order: FetchingOrder.NAME_ZA,
      filters: {
        withImage: false,
        withDescription: false,
      },
    }),
  );

  // ASSERT
  expect(result.current).toEqual([describerItem, orderItem]);
});

it('should include correct filters info when one filter is applied', () => {
  // ARRANGE
  const describerItem = { name: 'Test', type: 'describer' };

  const searchInput = '';

  const orderItem = {
    name: HumanizedOrder[FetchingOrder.NAME_ZA],
    prefix: ' ordered ',
    type: 'info',
  };

  const filterItem = { name: 'with image', prefix: ' with ', type: 'info' };
  // ACT

  const { result } = renderHook(() =>
    useControlPanelInputInfo({
      describer: 'Test',
      searchInput,
      order: FetchingOrder.NAME_ZA,
      filters: {
        withImage: true,
        withDescription: false,
      },
    }),
  );

  // ASSERT
  expect(result.current).toEqual([describerItem, orderItem, filterItem]);
});

it('should include correct filters info when two filter are applied', () => {
  // ARRANGE
  const describerItem = { name: 'Test', type: 'describer' };

  const searchInput = '';

  const orderItem = {
    name: HumanizedOrder[FetchingOrder.NAME_ZA],
    prefix: ' ordered ',
    type: 'info',
  };

  const filterItem1 = { name: 'with image', prefix: ' with ', type: 'info' };
  const filterItem2 = { name: 'with description', prefix: ' and ', type: 'info' };

  // ACT
  const { result } = renderHook(() =>
    useControlPanelInputInfo({
      describer: 'Test',
      searchInput,
      order: FetchingOrder.NAME_ZA,
      filters: {
        withImage: true,
        withDescription: true,
      },
    }),
  );

  // ASSERT
  expect(result.current).toEqual([describerItem, orderItem, filterItem1, filterItem2]);
});

it('should include correct info when all inputs are applied', () => {
  // ARRANGE
  const describerItem = { name: 'Test', type: 'describer' };

  const searchInput = 'Spiderman';

  const nameItem = { name: searchInput, prefix: ' for ', type: 'info' };

  const orderItem = {
    name: HumanizedOrder[FetchingOrder.NAME_ZA],
    prefix: ' ordered ',
    type: 'info',
  };

  const filterItem1 = { name: 'with image', prefix: ' with ', type: 'info' };
  const filterItem2 = { name: 'with description', prefix: ' and ', type: 'info' };

  // ACT
  const { result } = renderHook(() =>
    useControlPanelInputInfo({
      describer: 'Test',
      searchInput,
      order: FetchingOrder.NAME_ZA,
      filters: {
        withImage: true,
        withDescription: true,
      },
    }),
  );

  // ASSERT
  expect(result.current).toEqual([describerItem, nameItem, orderItem, filterItem1, filterItem2]);
});

it('should include correct info when no inputs are applied', () => {
  // ARRANGE
  const describerItem = { name: 'Test', type: 'describer' };

  // ACT
  const { result } = renderHook(() =>
    useControlPanelInputInfo({
      describer: 'Test',
      searchInput: '',
      order: FetchingOrder.NAME_AZ,
      filters: {
        withImage: false,
        withDescription: false,
      },
    }),
  );

  // ASSERT
  expect(result.current).toEqual([describerItem]);
});
