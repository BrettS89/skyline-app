import { ActionTypes } from '../actions';

export interface AppState {
  myApps: Record<string, any>[];
}

const INITIAL_STATE: AppState = {
  myApps: [],
};

const reducer = (state: AppState = INITIAL_STATE, { type, payload }: any) => {
  switch(type) {
    case ActionTypes.SET_MY_APPS:
      return {
        ...state,
        myApps: payload,
      };

    default:
      return state;
  }
};

export default reducer;
