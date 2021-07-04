import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const Landing = () => {
  const classes = useStyles();

  return (
    <div className="container">
      <div className={classes.tron}>
        <Typography className={classes.title} variant="h3">
          Production-Grade Deployments to <span className="blue">AWS</span>.
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.leftButton}
            disableElevation
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className={classes.rightButton}
            disableElevation
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
