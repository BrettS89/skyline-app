import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import useStyles from './styles';

const Header = (props: any) => {
  const classes = useStyles();

  return (
    <AppBar elevation={0} color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={`${classes.leftItems} hover`} onClick={() => props.history.push('/')}>
          <BarChartRoundedIcon style={{ fontSize: 44, color: 'white', paddingBottom: 1 }} />
          <Typography variant="h6" className={classes.logo}>
            SKYLINE
          </Typography>
          <Typography className={classes.beta}>
            Beta
          </Typography>
        </div>

        <div className={classes.rightItems}>
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
          {/* <Button
            color="secondary"
            variant="outlined"
            size="large"
            onClick={() => props.history.push('/login')}
          >
            Log in
          </Button> */}
        </div>
        
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
