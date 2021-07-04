import { FC } from 'react';
import { Button, Checkbox, TextField, Typography } from '@material-ui/core';
import useStyles from './styles';

interface Props {
  createApp(): void;
  environments: string[];
  services: string[];
  setName(name: string): void;
  updateEnvironments(checked: boolean, environment: string): void;
  updateServices(checked: boolean, service: string): void;
}

const CreateAppView: FC<Props> = ({ createApp, environments, setName, updateEnvironments, services, updateServices }) => {
  const classes = useStyles();

  const renderEnvs = () => {
    return ['Development', 'QA', 'Demo', 'Staging', 'Production'].map(e => {
      return (
        <div className={classes.envDiv} key={e}>
          <Checkbox
            checked={environments.includes(e)}
            color="primary"
            size="small"
            onChange={event => updateEnvironments(event.target.checked, e)}
          />
          <Typography>{e}</Typography>
        </div>
      );
    });
  };

  const renderServices = () => {
    return ['S3 file upload (without Cloudfront)', 'S3 file upload (with Cloudfront)'].map(s => {
      return (
        <div className={classes.envDiv} key={s}>
          <Checkbox
            checked={services.includes(s)}
            color="primary"
            size="small"
            onChange={service => updateServices(service.target.checked, s)}
          />
          <Typography>{s}</Typography>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <Typography variant="h5" className="title-margin">Create App</Typography>
      <div className={classes.section}>
        <Typography className={classes.label}>App name</Typography>
        <TextField
          placeholder="My killer app"
          variant="outlined"
          size="small"
          className={classes.nameInput}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className={classes.section}>
        <Typography className={classes.label}>Environments</Typography>
        {renderEnvs()}        
      </div>
      {/* <div className={classes.section}>
        <Typography className={classes.label}>Services</Typography>
        {renderServices()}
      </div> */}
      <div className={classes.createAppBtnDiv}>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          onClick={createApp}
        >
          Create app
        </Button>
      </div>
    </div>
  );
};

export default CreateAppView;
