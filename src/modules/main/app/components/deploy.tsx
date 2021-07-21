import { Button, Checkbox, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../styles';
import { appTypes, environmentTypes } from '../utilities';

const Deploy = ({ updateState, githubRepos, branches, deployFields, launchAppHosting }) => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <Typography className={classes.label}>
        Deploy
      </Typography>
      <div className={classes.deployDropdownDiv}>
        <Autocomplete
          size="small"
          options={environmentTypes}
          getOptionLabel={(option: any) => option.name}
          onChange={(event, newValue) => updateState('provider', newValue?.name ?? null)}
          renderInput={(params) => (
            <TextField
              className={classes.longDropdown}
              size="small" {...params}
              placeholder="Deploy to"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          size="small"
          options={appTypes}
          getOptionLabel={(option: any) => option.name}
          onChange={(event, newValue) => updateState('appType', newValue ?? null)}
          renderInput={(params) => (
            <TextField
              className={classes.longDropdown}
              size="small" {...params}
              placeholder="Application type"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          size="small"
          options={githubRepos}
          getOptionLabel={(option: any) => option.name}
          onChange={(event, newValue) => updateState('repository', newValue ?? null)}
          renderInput={(params) => (
            <TextField
              className={classes.longDropdown}
              size="small" {...params}
              placeholder="Repository"
              variant="outlined"
            />
          )}
        />
        <div className={classes.branchDiv}>
          <Autocomplete
          size="small"
            options={branches}
            getOptionLabel={(option: any) => option.name}
            onChange={(event, newValue) => updateState('branch', newValue?.name ?? null)}
            renderInput={(params) => (
              <TextField
                className={classes.shortDropdown}
                size="small"
                {...params}
                placeholder="Branch"
                variant="outlined"
              />
            )}
          />

          <div className={classes.deployOnCommitDiv}>
            <Checkbox
              color="primary"
              checked={deployFields.autoDeploy}
              onChange={e => updateState('autoDeploy', e.target.checked)}
            />
            <Typography>
              Deploy on code commit
            </Typography>
          </div>
        </div>

        
      </div>

      <Button
        color="primary"
        variant="contained"
        disableElevation
        onClick={launchAppHosting}
      >
        Launch Environment
      </Button>
    </div>
  );
};

export default Deploy;
