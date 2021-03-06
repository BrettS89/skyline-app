import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../feathers';
import { userSelector } from '../selectors';
import { ActionTypes } from '../actions';

export default [
  patchUserWatcher,
  getGithubReposWatcher,
  softAuthorizationWatcher,
];

function * softAuthorizationWatcher() {
  yield takeLatest(ActionTypes.SOFT_AUTHORIZATION, softAuthorizationHandler);
}

function * patchUserWatcher() {
  yield takeLatest(ActionTypes.PATCH_USER, patchUserHandler);
}

function * getGithubReposWatcher() {
  yield takeLatest(ActionTypes.GET_GITHUB_REPOS, getGithubReposHandler)
}

function * softAuthorizationHandler() {
  try {
    const authorizeFn = () => api
      .service('security/session')
      .find();

    const user = yield select(userSelector);

    if (!user.details) {
      const { data } = yield call(authorizeFn);

      yield put({
        type: ActionTypes.SET_USER,
        payload: data,
      });

      // GET MY APPS
      yield put({
        type: ActionTypes.GET_MY_APPS,
      });

      yield put({
        type: ActionTypes.GET_CERTIFICATES,
      });

      // GET GITHUB REPOS
      if (data.github_access_key) {
        yield put({
          type: ActionTypes.GET_GITHUB_REPOS,
        });
      }
    }

  } catch(e) {}
}

interface PatchUserProps {
  type: string;
  payload: Record<string, any>
}

function * patchUserHandler({ payload }: PatchUserProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: true } });
    const user = yield select(userSelector);

    const fn = () => api.service('security/user').patch(user.details._id, payload);
    const patchedUser = yield call(fn);

    yield put({
      type: ActionTypes.SET_USER,
      payload: { ...user.details, ...patchedUser },
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });

    if (Object.keys(payload).includes('aws_keys') && payload.aws_keys === null) {
      yield put({ type: ActionTypes.SET_APP_INFO, payload: 'AWS credentials successfully removed from Skyline' });
    }
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}

function * getGithubReposHandler() {
  try {
    const fn = () => api
      .service('github/repo')
      .find();

    const repos = yield call(fn);

    yield put({
      type: ActionTypes.SET_GITHUB_REPOS,
      payload: repos,
    });

  } catch(e) {
    console.log(e);
  }
}
