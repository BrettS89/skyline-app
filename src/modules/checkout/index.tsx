import { useDispatch, useSelector } from 'react-redux';
import authorization from '../../components/authorization';
import CheckoutView from './view';
import { ActionTypes, StoreState } from '../../redux';

const Checkout = (props) => {
  const dispatch = useDispatch();
  const plan = props.match.params.plan;

  const user = useSelector((state: StoreState) => state.user.details);

  const navigate = () => {
    props.history.push('/apps');
  };

  const onCheckout = (card: string, expDate: string, cvc: string) => {
    dispatch({
      type: ActionTypes.SUBSCRIBE_TO_PLAN,
      payload: {
        cardNumber: card,
        expDate,
        cvc,
        plan,
        navigate,
      }
    });
  };

  const onUpgrade = () => {
    dispatch({
      type: ActionTypes.UPGRADE_SUBSCRIPTION,
      payload: {
        navigate: () => props.history.push('/apps'),
        plan: 'production',
        plan_id: user?.plan?._id,
      },
    });
  }

  return (
    <CheckoutView
      checkout={onCheckout}
      onUpgrade={onUpgrade}
      plan={plan}
      user={user}
    />
  );
};

export default authorization(Checkout);
