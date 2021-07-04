import { StoreState } from './';
import { UserState } from './reducers/user';

export const appSelector = (state: StoreState) => state.app;
export const userSelector = (state: StoreState): UserState => state.user;
