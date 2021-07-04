import {
  call, put, takeLatest, select, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import api from '../../feathers';
import { UserState } from '../reducers/user';
import { AppState } from '../reducers/app';
import { ActionTypes } from '../actions';
import { appSelector, userSelector } from '../selectors';
import { createBucketFlow, environmentsMap } from '../../utilities';

export default [
  createAppWatcher,
  getMyAppsWatcher,
  connectGithubWatcher,
  launchAppHostingWatcher,
  addEnvVarsWatcher,
  terminateHostingWatcher,
  deleteAppWatcher,
  addHttpsListenerWatcher,
];

function * getMyAppsWatcher() {
  yield takeLatest(ActionTypes.GET_MY_APPS, getMyAppsHandler);
}

function * createAppWatcher() {
  yield takeLatest(ActionTypes.CREATE_APP, createAppHandler);
}

function * addEnvVarsWatcher() {
  yield takeLatest(ActionTypes.ADD_ENV_VARS, addEnvVarsHandler)
}

function * connectGithubWatcher() {
  yield takeLatest(ActionTypes.CONNECT_GITHUB, connectGithubHandler);
}

function * launchAppHostingWatcher() {
  yield takeLatest(ActionTypes.LAUNCH_APP_HOSTING, launchAppHostingHandler);
}

function * terminateHostingWatcher() {
  yield takeLatest(ActionTypes.TERMINATE_HOSTING, terminateHostingHandler);
}

function * deleteAppWatcher() {
  yield takeLatest(ActionTypes.DELETE_APP, deleteAppHandler);
}

function * addHttpsListenerWatcher() {
  yield takeLatest(ActionTypes.ADD_HTTPS_LISTENER, addHttpsListenerHandler);
}

function * getMyAppsHandler() {
  try {
    const user: UserState = yield select(userSelector);

    const fn = () => api.service('aws/app').find({
      query: {
        user_id: user.details._id,
        $sort: { createdAt: -1 },
        $resolve: {
          fetched_environments: true,
        },
      },
    });

    const apps = yield call(fn);

    yield put({
      type: ActionTypes.SET_MY_APPS,
      payload: apps.data,
    });

  } catch(e) {}
}

interface CreateApp {
  type: 'CREATE_APP';
  payload: {
    name: string;
    environments: string[];
    services: string[];
    navigate(id: string): void;
  }
}

function * createAppHandler({ payload }: CreateApp) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    
    const createS3 = payload.services.includes('S3 file upload (without Cloudfront)')
    const createCloudfront = payload.services.includes('S3 file upload (with Cloudfront)');

    const app: AppState = yield select(appSelector);
    const user: UserState = yield select(userSelector);

    let data: Record<string, any> = payload.environments.map(e => ({ environment: e }));

    if (createS3 || createCloudfront) {
      data = yield Promise.all(payload.environments.map(e =>  (
        createBucketFlow(`${payload.name}-${environmentsMap[e]}`, e, createCloudfront)
      )));
    }

    const fn = () => {
      return api.service('aws/app').create({
        user_id: user.details._id,
        account_id: user.details.account_id || null,
        name: payload.name,
        environments: data.map(d => {
          return {
            environment: d.environment,
            bucket_id: d.bucket?._id || null,
            cloudfront_id: d.cloudfront?._id || null,
            iam_user_id: d.iamUser?._id || null,
            policy_id: d.policy?._id || null,
            access_keys_id: d.accessKeys?._id || null,
          };
        }),
      }, {
        query: {
          $resolve: { fetched_environments: true },
        },
      });
    };

    const createdApp = yield call(fn);

    const updatedApps = [createdApp, ...app.myApps];

    yield put({
      type: ActionTypes.SET_MY_APPS,
      payload: updatedApps,
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });

    payload.navigate(createdApp._id);
  } catch(e) {
    console.log(e);
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}

interface AddEnvVarsProps {
  type: string;
  payload: {
    app_id: string;
    environment_id: string;
    env_vars: string[];
    remove?: boolean;
  }
}

function * addEnvVarsHandler ({ payload }: AddEnvVarsProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });

    const fn = () => api.service('aws/app').patch(payload.app_id, {
      environment_id: payload.environment_id,
      env_vars: payload.env_vars,
      remove: payload.remove,
    }, { query: { $resolve: { fetched_environments: true, } } });

    const patchedApp = yield call(fn);

    const app: AppState = yield select(appSelector);

    const updatedApps = app.myApps.map(a => {
      if (a._id === patchedApp._id) {
        return patchedApp;
      }

      return a;
    });

    yield put({ type: ActionTypes.SET_MY_APPS, payload: updatedApps });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}

interface ConnectGithubProps {
  type: string;
  payload: string;
}

function * connectGithubHandler({ payload }: ConnectGithubProps) {
  try {
    const fn = () => api.service('github/client-id').find();
    const { client_id } = yield call(fn);
    //@ts-ignore
    window.location = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=https://251c13a4c081.ngrok.io/apps/${payload}&state=scsa&scope=repo%20admin:repo_hook`
  
  } catch(e) {
    
  }
}

interface LaunchAppHostingProps {
  type: string;
  payload: {
    application_name: string;
    auto_deploy: boolean;
    github_account: string;
    github_repo: string;
    repo_branch: string;
    app_id: string;
    app_type: string;
    app_type_name: string;
    environment_id: string;
    provider: string;
    provider_type: string;
  }
}

function * launchAppHostingHandler({ payload }: LaunchAppHostingProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });
    const fn = () => api
      .service('aws/hosting')
      .create({
        application_name: payload.application_name,
        auto_deploy: payload.auto_deploy,
        github_account: payload.github_account,
        github_repo: payload.github_repo,
        repo_branch: payload.repo_branch,
        app_id: payload.app_id,
        app_type: payload.app_type,
        app_type_name: payload.app_type_name,
        environment_id: payload.environment_id,
        provider: payload.provider,
        provider_type: payload.provider_type,
      });

    yield call(fn);

    yield put({
      type: ActionTypes.GET_MY_APPS,
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    console.log(e);
  }
}

interface TerminateHostingProps {
  type: string;
  payload: {
    app_id: string;
    environment_id: string;
    hosting_id: string;
  }
}

function * terminateHostingHandler({ payload }: TerminateHostingProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });

    const app: AppState = yield select(appSelector);

    const removeHosting = () => api
      .service('aws/hosting')
      .remove(payload.hosting_id);

    yield call(removeHosting);

    const updatedEnvironments = app.myApps
      .find(a => a._id === payload.app_id)
      .environments
        .map(env => {
          if (env._id === payload.environment_id) {
            return {
              ...env,
              hosting_id: null,
            };
          }
          return env;
        });

    const patchApp = () => api
      .service('aws/app')
      .patch(
        payload.app_id,
        { environments: updatedEnvironments },
        { query: { $resolve: { fetched_environments: true } } }
      );

    const patchedApp = yield call(patchApp);

    const updatedAppState = app.myApps.map(a => {
      return a._id === patchedApp._id
        ? patchedApp
        : a;
    });

    yield put({ type: ActionTypes.SET_MY_APPS, payload: updatedAppState });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    console.log(e);
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}

interface DeleteAppProps {
  type: string;
  payload: {
    app_id: string;
    navigate(str: string): void;
  }
}

function * deleteAppHandler({ payload }: DeleteAppProps) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });

    const app: AppState = yield select(appSelector);

    const deleteApp = () => api
      .service('aws/app')
      .remove(payload.app_id);

    yield call(deleteApp);

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });

    payload.navigate('/apps');

    const updatedApps = app.myApps.filter(a => a._id !== payload.app_id);

    yield put({ type: ActionTypes.SET_MY_APPS, payload: updatedApps });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}

interface AddHttpsListener {
  type: string;
  payload: {
    app_id: string;
    hosting_id: string;
    environment_id: string;
    environment_name: string;
    ssl_certificate_arn: string;
  };
}

function * addHttpsListenerHandler({ payload }: AddHttpsListener) {
  try {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: true });

    const app: AppState = yield select(appSelector);
    const foundApp = app.myApps.find(a => a._id === payload.app_id);

    const fn = () => api
      .service('aws/hosting')
      .patch(payload.hosting_id, {
        environment_name: payload.environment_name,
        ssl_certificate_arn: payload.ssl_certificate_arn,
      });

    const res = yield call(fn);
    console.log(res);
    foundApp.fetched_environments = foundApp.fetched_environments.map(env => {
      if (env._id !== payload.environment_id) return env;

      return {
        ...env,
        hosting: res,
      };
    });

    const updatedApps = app.myApps.map(a => {
      return a._id === foundApp._id
        ? foundApp
        : a;
    });

    yield put({ type: ActionTypes.SET_MY_APPS, payload: updatedApps });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    console.log(e);
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  }
}
