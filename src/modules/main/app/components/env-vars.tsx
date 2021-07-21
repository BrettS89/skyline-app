import { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import useStyles from '../styles';

const EnvVars = ({ addEnvVar, environment }) => {
  const classes = useStyles();

  const [addingEnvVar, setAddingEnvVar] = useState(false);
  const [envVar, setEnvVar] = useState('');

  const onAddEnvVar = () => {
    addEnvVar(envVar);
    setEnvVar('');
    setAddingEnvVar(false);
  };

  const renderEnvVars = () => {
    return (environment.env_vars || [])
      .map(e => (
        <div key={e} className={classes.envVarDiv}>
          <span
            className={`${classes.envVarDelete} red-hover`}
            onClick={() => addEnvVar(e, true)}
          >
            <ClearRoundedIcon style={{ fontSize: 20 }} />
          </span>
          <Typography className={classes.envVarText}>{e}</Typography>
        </div>
      ));
  };

  const renderAddEnvVar = () => {
    if (addingEnvVar) {
      return (
        <div>
          <TextField
            className={classes.envVarInput}
            variant="outlined"
            size="small"
            placeholder="SAMPLE_VAR=value &#10;FOO=bar"
            value={envVar}
            onChange={e => setEnvVar(e.target.value)}
            multiline
            rows={4}
          />
          <div>
            <Button color="primary" onClick={onAddEnvVar}>Add variables</Button>
            <Button onClick={() => setAddingEnvVar(false)}>Cancel</Button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Button
          color='primary'
          variant='outlined'
          onClick={() => setAddingEnvVar(true)}
        >
          Add env var
        </Button>
      </div>
    )
  };

  const renderComponent = () => {
    if (!environment?.resources?.hosting) {
      return (
        <Typography>
          After launching an AWS environment, add environment variables in this section.
        </Typography>
      );
    }

    return (
      <>
        <div className={classes.envVars}>
          {renderEnvVars()}
        </div>
        {renderAddEnvVar()}
      </>
    )
  }

  return (
    <div className={classes.section}>
      {renderComponent()}
    </div>
  );
};

export default EnvVars;
