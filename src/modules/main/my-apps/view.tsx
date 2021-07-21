import useStyles from './styles';
import { FC } from 'react';
import { Button, Typography } from '@material-ui/core';
import AppCard from './components/app-card';

interface Props {
  myApps: Record<string, any>[];
  navigateTo(path: string): void;
}

const MyAppsView: FC<Props> = ({ myApps, navigateTo }) => {
  const classes = useStyles();

  const renderApps = () => myApps.map(a => (
    <AppCard
      key={a._id}
      app={a}
      navigateTo={navigateTo}
    />
  ));

  const renderNoAppsMessage = () => {
    if (myApps.length) return;

    return (
      <Typography className={classes.noApps}>
        You currently have no apps in Skyline. Click 'Create new app' to get started.
      </Typography>
    )
  };

  return (
    <div className="container">
      <div className="row-space-centered title-margin">
        <Typography variant="h5">My Apps</Typography>
        <Button
          disableElevation
          variant="outlined"
          color="primary"
          onClick={() => navigateTo('/create-app')}
        >
          Create new app
        </Button>
      </div>

      {renderNoAppsMessage()}

      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {renderApps()}
      </div>
      
    </div>
  );
};

export default MyAppsView;
