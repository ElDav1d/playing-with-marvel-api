import { FetchingOrder } from '../interfaces/characters';

export interface IOrderState {
  order: FetchingOrder;
}

export interface IOrderAction {
  type: 'SET_ORDER' | 'CLEAR_ORDER';
  order: FetchingOrder;
}

export const initialOrderState: IOrderState = {
  order: FetchingOrder.NAME_AZ,
};

const orderReducer = (state: IOrderState, action: IOrderAction): IOrderState => {
  switch (action.type) {
    case 'SET_ORDER':
      return { ...state, order: action.order };
    case 'CLEAR_ORDER':
      return { ...initialOrderState };
    default:
      return state;
  }
};

export default orderReducer;
