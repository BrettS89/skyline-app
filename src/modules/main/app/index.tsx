import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authorization from '../../../components/authorization';
import { ActionTypes } from '../../../redux/actions';
import { StoreState } from '../../../redux';
import { defaultProviderStatus, environmentTypes } from './utilities';
import View from './view';
import api from '../../../feathers';

const App = (props: any) => {
  const dispatch = useDispatch();
  const app_id = props.match.params.id;
  const user = useSelector((state: StoreState) => state.user);
  const apps = useSelector((state: StoreState) => state.app);
  const app = apps.myApps.find((a) => a._id === app_id);

  //@ts-ignore
  const [healthInterval, setHealthInterval] = useState(setInterval(() => [], 5000));

  const [environment, setEnvironment] = useState(null);
  const [appType, setAppType] = useState(null);
  const [autoDeploy, setAutoDeploy] = useState(false);
  const [branch, setBranch] = useState(null);
  const [branches, setBranches] = useState([]);
  const [provider, setProvider] = useState(null);
  const [providerStatus, setProviderStatus] = useState({});
  const [repository, setRepository] = useState(null);
  const [certificates, setCertificates] = useState([]);

  const fnMap = {
    appType: setAppType,
    autoDeploy: setAutoDeploy,
    branch: setBranch,
    provider: setProvider,
    repository: setRepository,
  };

  type stateVal =
    string | boolean | { name: string; branches_url: string }

  const updateState = (fn: string, val: stateVal): void => {
    const toUpdate = fnMap[fn];
    if (!toUpdate) {
      return;
    }

    toUpdate(val);

    if (toUpdate === setRepository && (typeof val !== 'string' && typeof val !== 'boolean')) {
      getBranches(val.branches_url);
    }
  };

  const connectGithub = () => {
    dispatch({
      type: ActionTypes.CONNECT_GITHUB,
      payload: app._id,
    });
  };

  const setGithubToken = async (): Promise<void> => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');

    if (code) {
      try {
        const userWithGithubDetails = await api
          .service('github/access-token')
          .create({
            code,
          });

        dispatch({
          type: ActionTypes.SET_USER,
          payload: userWithGithubDetails,
        });

      } catch(e) {
        console.log(e);
      }
    }
  };

  const getEnvironmentDetails = async (env?: Record<string, any>) => {
    let providerEnvironment: string;

    if (env) {
      providerEnvironment = env?.hosting?.provider_environment;
    } else {
      providerEnvironment = environment?.hosting?.provider_environment;
    }

    if (!providerEnvironment) {
      setProviderStatus(defaultProviderStatus);
      return;
    };

    try {
      const status = await api
        .service('aws/status')
        .find({ query: { environment: providerEnvironment } });

        setProviderStatus({
        ...defaultProviderStatus,
        ...status,
      });
    } catch(e) {
      setProviderStatus(defaultProviderStatus);
    }
  };

  const setAppEnvironment = (env: Record<string, any>) => {
    setEnvironment(env);
    getEnvironmentDetails(env);
    clearInterval(healthInterval);
    setHealthInterval(setInterval(() => getEnvironmentDetails(env), 5000));
  };

  const getBranches = async (url: string) => {
    const fetchedBranches = await
      api
        .service('github/branch')
        .find({ query: { branches_url: url } });

    setBranches(fetchedBranches || []);
  };

  const launchAppHosting = () => {
    dispatch({
      type: ActionTypes.LAUNCH_APP_HOSTING,
      payload: {
        app_id: app._id,
        app_type: appType.value,
        app_type_name: appType.name,
        environment_id: environment._id,
        application_name: `${app.name}-${environment.environment}`
          .toLowerCase()
          .split(' ')
          .join('-'),
        auto_deploy: autoDeploy,
        github_account: user.details.github_username,
        github_repo: repository.name,
        repo_branch: branch,
        provider: 'ElasticBeanstalk',
        provider_type: provider,
      },
    });
  };

  const executePipeline = () => {
    api
      .service('aws/hosting')
      .patch(environment.hosting._id, {
        pipeline_name: environment?.hosting?.pipeline_name,
      });
  };

  const addEnvVar = (envVars: string[], remove=false): void => {
    dispatch({
      type: ActionTypes.ADD_ENV_VARS,
      payload: {
        app_id: app._id,
        env_vars: envVars,
        environment_id: environment._id,
        remove,
      },
    });
  };

  const terminateHosting = () => {
    dispatch({
      type: ActionTypes.TERMINATE_HOSTING,
      payload: {
        app_id: app._id,
        environment_id: environment._id,
        hosting_id: environment?.hosting?._id,
      },
    });
  };

  const deleteApp = () => {
    dispatch({
      type: ActionTypes.DELETE_APP,
      payload: {
        app_id: app._id,
        navigate(path: string) {
          props.history.push(path);
        },
      }
    })
  };

  const getCertificates = async (): Promise<void> => {
    const { certificates } = await api
      .service('aws/certificate')
      .find();

    setCertificates(certificates);
  };

  const addHttpsListener = (ssl_certificate_arn: string): void => {
    dispatch({
      type: ActionTypes.ADD_HTTPS_LISTENER,
      payload: {
        app_id: app._id,
        environment_id: environment._id,
        environment_name: environment.hosting.provider_environment,
        hosting_id: environment.hosting._id,
        ssl_certificate_arn,
      }
    });
  };

  useEffect(() => {
    if (!app) {
      dispatch({ type: ActionTypes.GET_MY_APPS });
    } else if (!environment) {
      setEnvironment(app?.fetched_environments?.[0]);
      getEnvironmentDetails(app?.fetched_environments?.[0]);
      clearInterval(healthInterval);
      setHealthInterval(setInterval(() => getEnvironmentDetails(app?.fetched_environments?.[0]), 5000));
    } else if (environment) {
      const env = app.fetched_environments.find(e => e._id === environment._id);
      setEnvironment(env);
      getEnvironmentDetails(env);
      clearInterval(healthInterval);
      setHealthInterval(setInterval(() => getEnvironmentDetails(env), 5000));
    }
  }, [app]);

  useEffect(() => {
    setGithubToken();
    getCertificates();

    return () => {
      clearInterval(healthInterval);
    }
  }, []);

  return app && environment ? (
    <View
      addEnvVar={addEnvVar}
      addHttpsListener={addHttpsListener}
      certificates={certificates}
      deployFields={{
        autoDeploy,
      }}
      app={app}
      branches={branches}
      connectGithub={connectGithub}
      deleteApp={deleteApp}
      environment={environment}
      executePipeline={executePipeline}
      githubRepos={user.githubRepos}
      launchAppHosting={launchAppHosting}
      providerStatus={providerStatus}
      setEnvironment={setAppEnvironment}
      terminateHosting={terminateHosting}
      updateState={updateState}
      user={user.details}
    />
  ) : <div>Loading...</div>;
};

export default authorization(App);
