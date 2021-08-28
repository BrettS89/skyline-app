import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../feathers';
import { UserState } from '../reducers/user';
import { userSelector } from '../selectors';
import { ActionTypes } from '../actions';

export default [
  subscribeToPlanWatcher,
  cancelSubscriptionWatcher,
  upgradeSubscriptionWatcher,
];

function * subscribeToPlanWatcher() {
  yield takeLatest(ActionTypes.SUBSCRIBE_TO_PLAN, subscribeToPlanHandler)
}

function * cancelSubscriptionWatcher() {
  yield takeLatest(ActionTypes.CANCEL_SUBSCRIPTION, cancelSubscriptionHandler);
}

function * upgradeSubscriptionWatcher() {
  yield takeLatest(ActionTypes.UPGRADE_SUBSCRIPTION, upgradeSubscriptionHandler);
}

interface SubscribeProps {
  type: string;
  payload: {
    cardNumber: string;
    expDate: string;
    cvc: string;
    plan: string;
    navigate(): void;
  };
}

function * subscribeToPlanHandler({ payload }: SubscribeProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: true, message: 'Subscribing to plan' } });

    if (payload.plan !== 'development' && payload.plan !== 'production') {
      throw new Error('This is not a valid plan');
    }

    const user: UserState = yield select(userSelector);

    if (!user.details?.stripe?.customer_id) {
      const createStripeAccount = () => api
        .service('payment/stripe')
        .create({
          number: payload.cardNumber,
          exp_date: payload.expDate,
          cvc: payload.cvc,
        });

      yield call(createStripeAccount);
    }

    const subscribeToPlan = () => api
      .service('payment/plan')
      .create({
        plan: payload.plan,
      });

    const getUser = () => api
      .service('security/user')
      .get(user.details._id, {
        query: {
          $resolve: {
            role: true,
            stripe: true,
            plan: true,
          },
        },
      });
    
    yield call(subscribeToPlan);
    const updatedUser = yield call(getUser);

    yield put({
      type: ActionTypes.SET_USER,
      payload: updatedUser,
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });

    payload.navigate();

    yield put({
      type: ActionTypes.SET_APP_INFO,
      payload: `You were successfully subscribed to the ${payload.plan} plan`,
    });

  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}

function * cancelSubscriptionHandler() {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: true, message: 'Cancelling your subscription' } });

    const user: UserState = yield select(userSelector);

    const userClone = _.cloneDeep(user);
    console.log(user.details.plan._id);
    const cancelSubscription = () => api
      .service('payment/plan/')
      .remove(user.details?.plan?._id);

    yield call(cancelSubscription);

    userClone.details.plan = null;

    yield put({
      type: ActionTypes.SET_USER,
      payload: userClone.details,
    });

    yield put({
      type: ActionTypes.SET_APP_INFO,
      payload: 'Your subscription was successfully cancelled',
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });
  } catch(e) {
    console.log(e);
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}

interface UpgradeProps {
  type: string;
  payload: {
    navigate(): void;
    plan_id: string;
    plan: string;
  }
}

function * upgradeSubscriptionHandler({ payload }: UpgradeProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: true, message: 'Upgrading your subscription' } });
    const user: UserState = yield select(userSelector);
    const userClone = _.cloneDeep(user);

    const upgradeSubscription = () => api
      .service('payment/plan')
      .patch(payload.plan_id, {
        plan: payload.plan,
      });

    const plan = yield call(upgradeSubscription);

    userClone.details.plan = plan;

    console.log(userClone)

    yield put({
      type: ActionTypes.SET_USER,
      payload: userClone.details,
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });

    payload.navigate();

    yield put({
      type: ActionTypes.SET_APP_INFO,
      payload: 'Your subscription was successfully upgraded',
    });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}
