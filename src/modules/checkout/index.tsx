import CheckoutView from './view';

const Checkout = (props) => {
  const plan = props.match.params.plan;

  return (
    <CheckoutView
      plan={plan}
    />
  );
};

export default Checkout;
