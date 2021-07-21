import { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import useStyles from './styles';
import Deploy from './components/deploy';
import ProviderStatus from './components/provider-status';
import Https from './components/https';

const AppView = ({ addEnvVar, addHttpsListener, app, branches, certificates, connectGithub, deployFields, deleteApp, environment, executePipeline, githubRepos, launchAppHosting, providerStatus, setEnvironment, terminateHosting, updateState, user }) => {
  const classes = useStyles();

  const [addingEnvVar, setAddingEnvVar] = useState(false);
  const [envVar, setEnvVar] = useState('');

  const onAddEnvVar = () => {
    addEnvVar([envVar]);
    setEnvVar('');
    setAddingEnvVar(false);
  }

  const renderAddEnvVar = () => {
    if (addingEnvVar) {
      return (
        <div>
          <TextField
            className={classes.envVarInput}
            variant="outlined"
            size="small"
            placeholder="ENV_VAR=value"
            value={envVar}
            onChange={e => setEnvVar(e.target.value)}
          />
          <div>
            <Button color="primary" onClick={onAddEnvVar}>Add variable</Button>
            <Button onClick={() => setAddingEnvVar(false)}>Cancel</Button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <span
          className="hover link"
          onClick={() => setAddingEnvVar(true)}
        >
          Add env var
        </span>
      </div>
    )
  }

  const renderDeploy = () => {
    if (environment.resources?.hosting) {
      return (
        <ProviderStatus
          environment={environment.resources}
          executePipeline={executePipeline}
          providerStatus={providerStatus}
          terminateHosting={terminateHosting}
        />
      );
    }

    return (
      <Deploy
        branches={branches}
        githubRepos={githubRepos}
        updateState={updateState}
        deployFields={deployFields}
        launchAppHosting={launchAppHosting}
      />
    );
  };

  const renderEnvVarsSection = () => {
    if (environment.resources?.hosting) {
      return (
        <div className={classes.section}>
          <Typography className={classes.label}>
            Environment variables
          </Typography>
          <div className={classes.envVars}>
            {renderEnvVars()}
          </div>
          {renderAddEnvVar()}
        </div>
      );
    }
  }

  const renderEnvironments = () => {
    return app.environments.map(e => {
      const color = e.environment === environment.environment
        ? '#487FF2'
        : 'gray';

      return (
        <div className={`${classes.environmentDiv} hover`} onClick={() => setEnvironment(e)}>
          <Typography className={classes.environmentName} style={{ color }}>
            {e.environment}
          </Typography>
        </div>
      );
    });
  };

  const renderEnvVars = () => {
    return (environment.env_vars || [])
      .map(e => (
        <div key={e} className={classes.envVarDiv}>
          <span
            className={`${classes.envVarDelete} red-hover`}
            onClick={() => addEnvVar([e], true)}
          >
            <ClearRoundedIcon style={{ fontSize: 20 }} />
          </span>
          <Typography className={classes.envVarText}>{e}</Typography>
        </div>
      ));
  };

  const renderConnectToGithub = () => {
    if (!user.github_access_key) {
      return (
        <Button color="primary" variant="outlined" onClick={connectGithub}>
          Connect your Github account
        </Button>
      );
    }
    return (
      <Typography className={classes.envVarText}>
        Connected
      </Typography>
    );
  };

  return (
    <div className="container">
      <div className="row-space-centered title-margin">
        <Typography variant="h5">
          {app.name}
        </Typography>
        <span
          className={`${classes.deleteAppText} red-hover`}
          onClick={deleteApp}
        >
          <Typography>
            Delete app
          </Typography>
        </span>
      </div>
      
      <div className={classes.content}>
        <div className={classes.left}>
          {renderEnvironments()}
        </div>
      
        <div className={classes.right}>
          <div className={classes.section}>
            <Typography className={classes.label}>
              Github connection
            </Typography>
            <div className="row-centered">
              <GitHubIcon style={{ marginRight: 10, fontSize: 30 }} />
              {renderConnectToGithub()}
            </div>
          </div>

          <div className={classes.section}>
            <Typography className={classes.label}>
              Deploy
            </Typography>

            {renderDeploy()}

          </div>

          {renderEnvVarsSection()}

          {environment?.resources?.hosting && (
            <Https
              addHttpsListener={addHttpsListener}
              certificates={certificates}
              hosting={environment.resources?.hosting}
            />
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AppView;
