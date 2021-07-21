import { ActionTypes } from '../actions';

export interface GeneralState {
  isLoading: boolean;
  error: {
    message: string;
  };
  info: {
    message: string;
  }
  snackbarOpen: boolean;
  dealModalOpen: boolean;
}

const INITIAL_STATE: GeneralState = {
  isLoading: false,
  error: {
    message: '',
  },
  info: {
    message: ''
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

    case ActionTypes.SET_APP_INFO:
      return {
        ...state,
        snackbarOpen: true,
        info: {
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
        info: {
          message: '',
        },
      };

    default:
      return state;
  }
};

export default reducer;
