import { Button, Typography } from '@material-ui/core';
import KeyValue from '../../../../components/key-value';
import useStyles from '../styles';

const ProviderStatus = ({ environment, executePipeline, providerStatus, terminateHosting }) => {
  const classes = useStyles();

  return (
    <div>
      <div className="row-space-centered">
        <Typography className={classes.statusTitle}>
          {environment.hosting.provider_type}
        </Typography>
        <span
          className={`${classes.deleteButton} red-hover`}
          onClick={terminateHosting}
        >
          <Typography>
            Terminate
          </Typography>
        </span>
      </div>
      <div className={classes.statusKvp}>
        <KeyValue
          keyText='URL:'
          value={providerStatus.CNAME || 'Generating'}
        />
      </div>
      <div className={classes.statusKvp}>
        <KeyValue
          keyText='Health:'
          value={providerStatus.HealthStatus}
        />
      </div>
      <div className={classes.statusKvp}>
        <KeyValue
          keyText='Status:'
          value={providerStatus.Status}
        />
      </div>
      <div className={classes.statusKvp}>
        <KeyValue
          keyText='Connection:'
          value={`${environment.hosting.github_repo}/${environment.hosting.repo_branch}`}
        />
      </div>
      <div className={classes.deployBtn}>
        <Button
          className={classes.statusKvp}
          color='primary'
          variant='contained'
          disableElevation
          onClick={executePipeline}
        >
          Deploy
        </Button>
      </div>
    </div>
  );
};

export default ProviderStatus;
