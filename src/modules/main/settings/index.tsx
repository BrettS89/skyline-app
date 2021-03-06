import { useDispatch, useSelector } from 'react-redux';
import { StoreState, ActionTypes } from '../../../redux';
import authorization from '../../../components/authorization';
import View from './view';

const Settings = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user.details);

  const patchUser = (data: Record<string, any>) => {
    dispatch({
      type: ActionTypes.PATCH_USER,
      payload: data,
    });
  };

  const cancelSubscription = () => {
    dispatch({
      type: ActionTypes.CANCEL_SUBSCRIPTION,
    })
  }

  const logout = () => {
    localStorage.clear();
    props.history.push('/');
  };

  return (
    <View
      cancelSubscription={cancelSubscription}
      logout={logout}
      patchUser={patchUser}
      user={user}
    />
  );
};

export default authorization(Settings);
