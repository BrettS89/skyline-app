import { ActionTypes } from '../actions';

export interface AppState {
  myApps: Record<string, any>[];
  certificates: Record<string, any>[];
}

const INITIAL_STATE: AppState = {
  myApps: [],
  certificates: [],
};

const reducer = (state: AppState = INITIAL_STATE, { type, payload }: any) => {
  switch(type) {
    case ActionTypes.SET_MY_APPS:
      return {
        ...state,
        myApps: payload,
      };

    case ActionTypes.SET_CERTIFICATES:
      return {
        ...state,
        certificates: payload,
      };

    default:
      return state;
  }
};

export default reducer;
