import { combineReducers } from 'redux';
import appReducer, { AppState } from './app';
import userReducer, { UserState } from './user';
import generalReducer, { GeneralState } from './general';

export interface StoreState {
  app: AppState;
  user: UserState;
  general: GeneralState;
}

export default combineReducers({
  app: appReducer,
  user: userReducer,
  general: generalReducer,
});
