import { FetchingOrder } from '../interfaces/characters';

export type OrderState = FetchingOrder;

export type OrderAction = { type: 'SET_ORDER'; order: FetchingOrder } | { type: 'CLEAR_ORDER' };

const persistedState = sessionStorage.getItem('__characters__state__');

export const initialOrderState: OrderState = persistedState
  ? JSON.parse(persistedState).order
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
