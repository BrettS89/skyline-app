import { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import useStyles from './styles';
import SubNav from './components/sub-nav';
import Deploy from './components/deploy';
import EnvVars from './components/env-vars';
import ProviderStatus from './components/provider-status';
import Https from './components/https';
import Logs from './components/logs';

const AppView = ({ addEc2HttpsListener, addEnvVar, addHttpsListener, app, branches, certificates, connectGithub, deployFields, deleteApp, environment, executePipeline, githubRepos, launchAppHosting, providerStatus, setEnvironment, terminateHosting, updateState, user }) => {
  const classes = useStyles();

  const [component, setComponent] = useState('Deploy');

  const renderDeploy = () => {
    if (environment.resources?.hosting) {
      return (
        <>
          <div className={classes.section}>
            <Typography className={classes.label}>
              Github connection
            </Typography>
            <div className="row-centered">
              <GitHubIcon style={{ marginRight: 10, fontSize: 30 }} />
              {renderConnectToGithub()}
            </div>
          </div>
          <ProviderStatus
            environment={environment.resources}
            executePipeline={executePipeline}
            providerStatus={providerStatus}
            terminateHosting={terminateHosting}
          />
        </>
      );
    }

    return (
      <>
        <div className={classes.section}>
          <Typography className={classes.label}>
            Github connection
          </Typography>
          <div className="row-centered">
            <GitHubIcon style={{ marginRight: 10, fontSize: 30 }} />
            {renderConnectToGithub()}
          </div>
        </div>
      <Deploy
        branches={branches}
        githubRepos={githubRepos}
        updateState={updateState}
        deployFields={deployFields}
        launchAppHosting={launchAppHosting}
        user={user}
      />
      </>
    );
  };

  const renderEnvironments = () => {
    return app.environments.map(e => {
      const color = e.environment === environment.environment
        ? '#5367FF'
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

  const renderSection = () => {
    switch(component) {
      case 'Deploy':
        return renderDeploy();

      case 'Environment Variables':
        return (
          <EnvVars
            environment={environment}
            addEnvVar={addEnvVar}
          />
        );

      case 'HTTPS':
        return (
          <Https
            addEc2HttpsListener={addEc2HttpsListener}
            addHttpsListener={addHttpsListener}
            certificates={certificates}
            hosting={environment.resources?.hosting}
          />
        );

      case 'Logs':
        return (
          <Logs
            hosting={environment.resources.hosting}
          />
        )

      default:
        return renderDeploy();
    }
  }

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
          <SubNav
            componentName={component}
            setComponent={setComponent}
            user={user}
          />

          {renderSection()}
          
        </div>
      </div>
    </div>
  );
};

export default AppView;
