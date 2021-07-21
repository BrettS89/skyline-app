import { FC } from 'react';
import { Typography } from '@material-ui/core';
import CloudRoundedIcon from '@material-ui/icons/CloudRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import useStyles from '../styles';

interface Props {
  app: Record<string, any>
  navigateTo(path: string): void;
}

const AppCard: FC<Props> = ({ app, navigateTo }) => {
  const classes = useStyles();

  const environments = app.environments.map(e => e.environment);

  return (
    <div
      className={classes.appCard}
      onClick={() => navigateTo(`apps/${app._id}`)}
    >
      <div className={classes.appCardLeft}>
        <CloudRoundedIcon style={{ fontSize: 28, marginRight: 15, color: '#5367FF' }} />
        <div className={classes.appCardName}>
          <Typography>
            {app.name}
          </Typography>
        </div>
        <Typography className={classes.appCardEnvs}>
          {environments.join(' · ').toLowerCase()}
        </Typography>
      </div>
      <div>
        <MoreHorizRoundedIcon style={{ fontSize: 28 }} />
      </div>
    </div>
  );
};

export default AppCard;
