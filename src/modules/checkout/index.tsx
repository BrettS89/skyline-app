import { useDispatch } from 'react-redux';
import authorization from '../../components/authorization';
import CheckoutView from './view';
import { ActionTypes } from '../../redux';

const Checkout = (props) => {
  const dispatch = useDispatch();
  const plan = props.match.params.plan;

  const onCheckout = (card: string, expDate: string, cvc: string) => {
    dispatch({
      type: ActionTypes.SUBSCRIBE_TO_PLAN,
      payload: {
        cardNumber: card,
        expDate,
        cvc,
        plan,
      }
    });
  }

  return (
    <CheckoutView
      checkout={onCheckout}
      plan={plan}
    />
  );
};

export default authorization(Checkout);
