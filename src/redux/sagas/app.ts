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
          environments: true,
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

    if (!payload.name) throw new Error('Your app must have a name.');
    if (!payload.environments.length) throw new Error('You must have at least one environment for this app.');
     
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

    const createEnvironments = () => {
      return Promise.all(data.map(d => {
        return api
          .service('aws/environment')
          .create({
            environment: d.environment,
            bucket_id: d.bucket?._id || null,
            cloudfront_id: d.cloudfront?._id || null,
            iam_user_id: d.iamUser?._id || null,
            policy_id: d.policy?._id || null,
            access_keys_id: d.accessKeys?._id || null,
          });
      }));
    };

    const environments = yield call(createEnvironments);

    const createApp = () => {
      return api.service('aws/app').create({
        user_id: user.details._id,
        account_id: user.details.account_id || null,
        name: payload.name,
        environment_ids: environments.map(e => e._id),
      }, {
        query: {
          $resolve: { environments: true },
        },
      });
    };

    const createdApp = yield call(createApp);

    const updatedApps = [createdApp, ...app.myApps];

    yield put({
      type: ActionTypes.SET_MY_APPS,
      payload: updatedApps,
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });

    payload.navigate(createdApp._id);
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
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

    if (!payload.remove && !payload.env_vars.every(env => env.includes('='))) {
      throw new Error('Env vars must be formatted, VAR_NAME=varValue and each be separated by a new line');
    }

    const fn = () => api
      .service('aws/environment')
      .patch(payload.environment_id, {
        env_vars: payload.env_vars,
        remove: payload.remove,
      });

    yield call(fn);

    yield put({
      type: ActionTypes.GET_MY_APPS,
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
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
    window.location = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}${payload}&state=scsa&scope=repo%20admin:repo_hook`;
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
    if (!payload.github_account) throw new Error('You must have a Github connection to launch an AWS environment.');
    if (!payload.provider_type) throw new Error('You must select a "Deploy to" environment.');
    if (!payload.app_type) throw new Error('You must select an applicaiton type.');
    if (!payload.github_repo || !payload.repo_branch) throw new Error('You must select both a Github repo and branch to launch an AWS environment.');

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
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
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

    const removeHosting = () => api
      .service('aws/hosting')
      .remove(payload.hosting_id);

    yield call(removeHosting);

    const patchEnvironment = () => api
      .service('aws/environment')
      .patch(payload.environment_id, {
        hosting_id: null,
      });

    yield call(patchEnvironment);

    yield put({
      type: ActionTypes.GET_MY_APPS,
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
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
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
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

    const fn = () => api
      .service('aws/hosting')
      .patch(payload.hosting_id, {
        environment_name: payload.environment_name,
        ssl_certificate_arn: payload.ssl_certificate_arn,
      });

    yield call(fn);

    yield put({
      type: ActionTypes.GET_MY_APPS,
    });

    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
  } catch(e) {
    yield put({ type: ActionTypes.SET_APP_LOADING, payload: false });
    yield put({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
  }
}
