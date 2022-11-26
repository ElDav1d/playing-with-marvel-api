export const OrderSelector = ({ ...rest }) => {
  return (
    <fieldset>
      <label htmlFor='order'>Order</label>
      <select {...rest} name='order'>
        <option value='name'>name A/Z</option>
        <option value='-name'>name Z/A</option>
        <option value='modified'>modified +</option>
        <option value='-modified'>modified -</option>
      </select>
    </fieldset>
  );
};
