import { FetchingOrder } from '../interfaces/characters';

export type OrderState = FetchingOrder;

export type OrderAction = { type: 'SET_ORDER'; order: FetchingOrder } | { type: 'CLEAR_ORDER' };

const storageItem = localStorage.getItem('charactersContext');

export const initialOrderState: OrderState = storageItem
  ? JSON.parse(storageItem).order
  : FetchingOrder.NAME_AZ;

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'SET_ORDER':
      return action.order;
    case 'CLEAR_ORDER':
      return initialOrderState;
    default:
      return state;
  }
};

export default orderReducer;
