import { useState } from 'react';
import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { capitalize } from '../../../utilities';

const SettingsView = ({ cancelSubscription, logout, patchUser, user }) => {
  const classes = useStyles();

  const [awsAccessKeyId, setAwsAccessKeyId] = useState('');
  const [awsSecretAccessKey, setAwsSecretAccessKey] = useState('');

  const plan = user?.plan?.plan ?? 'Sandbox';

  const onAddCredentials = () => {
    patchUser({
      aws_keys: {
        access_key_id: awsAccessKeyId,
        secret_access_key: awsSecretAccessKey,
      },
    });

    setAwsAccessKeyId('');
    setAwsSecretAccessKey('');
  };

  const onRemoveCredentials = () => {
    patchUser({ aws_keys: null });
  }

  const renderAwsConnectForm = () => (
    <div className={classes.awsSection}>
      <TextField
        size='small'
        label='AWS access key id'
        variant='outlined'
        className={classes.awsConnectInput}
        onChange={e => setAwsAccessKeyId(e.target.value)}
        value={awsAccessKeyId}
      />
      <TextField
        size='small'
        label='AWS secret access key'
        type='password'
        variant='outlined'
        className={classes.awsConnectInput}
        onChange={e => setAwsSecretAccessKey(e.target.value)}
        value={awsSecretAccessKey}
      />
      <div>
        <Button
          variant='contained'
          disableElevation
          color='primary'
          disabled={!awsAccessKeyId || !awsSecretAccessKey}
          onClick={onAddCredentials}
        >
          Add Credentails
        </Button>
      </div>
    </div>
  );

  const renderCredentialsAdded = () => (
    <div className={classes.awsSection}>
      <Typography className={classes.awsConnectedText}>Connected</Typography>
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={onRemoveCredentials}
        >
          Remove Credentials
        </Button>
      </div>
    </div>
  );

  const renderAwsSection = () => 
    user?.aws_keys?.access_key_id && user?.aws_keys?.secret_access_key
      ? renderCredentialsAdded()
      : renderAwsConnectForm();

  const renderCancelButton = () => {
    const render = user?.plan?.plan === 'development' || user?.plan?.plan === 'production';

    console.log(render);

    if (render) {
      return (
        <Button
          variant='outlined'
          className={classes.cancelButton}
          disableElevation
          onClick={cancelSubscription}
        >
          Cancel subscription
        </Button>
      );
    }
  };

  return (
    <div className='container'>
      <Typography variant='h5' className='title-margin'>
        Settings
      </Typography>
      <div className={classes.section}>
        <Typography className={classes.label}>
          AWS Connection
        </Typography>
        {renderAwsSection()}
      </div>
      <div className={classes.section}>
        <Typography className={classes.label}>
          Subscription
        </Typography>
        <Typography className={classes.key}>
          Plan: <span className={classes.value}>{capitalize(plan)}</span>
        </Typography>
        {renderCancelButton()}
      </div>
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={logout}
        >
          Log out
        </Button>
      </div>
      
    </div>
  );
};

export default SettingsView;
