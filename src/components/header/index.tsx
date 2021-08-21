import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import { StoreState } from '../../redux';
import useStyles from './styles';
import { capitalize } from '../../utilities';

const Header = (props: any) => {
  const classes = useStyles();
  const token = localStorage.getItem('token');

  const user = useSelector((state: StoreState) => state.user.details);

  const renderConnectAwsButton = () => {
    if (user?.aws_keys?.access_key_id && user?.aws_keys?.secret_access_key) {
      return;
    }

    if (!window.location.pathname.includes('app') && !window.location.pathname.includes('ssl')) {
      return;
    }

    return (
      <Button
        className={classes.link}
        onClick={() => props.history.push('/settings')}
      >
        <ErrorOutlineRoundedIcon style={{ marginRight: 5 }} />
        Connect your AWS account
      </Button>
    );
  };

  const getPlan = () => {
    return user?.plan?.plan
      ? capitalize(user?.plan?.plan)
      : 'Sandbox';
  }

  const notLoggedIn = () => {
    if (token) return;

    return (
      <div className={classes.rightItems}>
        <Button
          className={classes.link}
          onClick={() => props.history.push('/subscriptions')}
        >
          Pricing
        </Button>
        <Button
          className={classes.link}
          onClick={() => props.history.push('/login')}
        >
          Log In
        </Button>
        <Button
          className={classes.link}
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() => props.history.push('/signup')}
        >
          Sign Up
        </Button>
      </div>
    );
  };

  const loggedIn = () => {
    if (!token) return;

    return (
      <div className={classes.rightItems}>
        {renderConnectAwsButton()}
        <Button
          className={classes.link}
          onClick={() => props.history.push('/apps')}
        >
          My Apps
        </Button>
        <Button
          className={classes.link}
          onClick={() => props.history.push('/ssl-certificates')}
        >
          SSL Certificates
        </Button>
        <Typography className={classes.planText}>
          Plan: {getPlan()}
        </Typography>
        <div
          className={`hover ${classes.userIcon}`}
          onClick={() => props.history.push('/settings')}
        >
          <AccountCircleIcon style={{ fontSize: 36 }} />
        </div>
      </div>
    )
  };

  return (
    <AppBar elevation={0} color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={`${classes.leftItems} hover`} onClick={() => props.history.push('/')}>
          <BarChartRoundedIcon style={{ fontSize: 40, color: 'white', paddingBottom: 1 }} />
          <Typography className={classes.logo}>
            SKYLINE
          </Typography>
          <Typography className={classes.beta}>
            Beta
          </Typography>
        </div>

        {loggedIn()}
        {notLoggedIn()}
        
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
