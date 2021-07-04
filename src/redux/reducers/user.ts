import { User } from '../../types/services/security';
import { ActionTypes } from '../actions';

export interface UserState {
  details: User | null;
  githubRepos: Array<{
    name: string;
    branches_url: string;
  }>;
}

const INITIAL_STATE = {
  details: null,
  githubRepos: [],
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        details: payload,
      };

    case ActionTypes.SET_GITHUB_REPOS:
      return {
        ...state,
        githubRepos: payload,
      };

    default:
      return state;
  }
};

export default reducer;
