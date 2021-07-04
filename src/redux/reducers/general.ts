import { ActionTypes } from '../actions';

export interface GeneralState {
  isLoading: boolean;
  error: {
    message: string;
  };
  snackbarOpen: boolean;
  dealModalOpen: boolean;
}

const INITIAL_STATE: GeneralState = {
  isLoading: false,
  error: {
    message: '',
  },
  snackbarOpen: false,
  dealModalOpen: false,
};

const reducer = (state: GeneralState = INITIAL_STATE, { type, payload }: any) => {
  switch(type) {
    case ActionTypes.SET_APP_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    case ActionTypes.SET_APP_ERROR:
      return {
        ...state,
        snackbarOpen: true,
        error: {
          message: payload,
        },
      };

    case ActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpen: false,
        error: {
          message: '',
        },
      };

    default:
      return state;
  }
};

export default reducer;
