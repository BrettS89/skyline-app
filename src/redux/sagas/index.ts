import { all, fork } from 'redux-saga/effects';
import userSagas from './user';
import appSagas from './app';

const forkList = (sagasList: any) => sagasList.map((saga: any) => fork(saga));

export default function * root() {
  yield all([
    ...forkList(userSagas),
    ...forkList(appSagas),
  ]);
}
