import { ChangeEventHandler } from 'react';

export interface OrderProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  order: string[];
}

const OrderSelector = ({ onChange, order }: OrderProps) => {
  return (
    <fieldset>
      <legend>Order results:</legend>
      <select onChange={onChange} name='order'>
        {order.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default OrderSelector;
