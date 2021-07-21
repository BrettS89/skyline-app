import { useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { StoreState } from '../../redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.drawer + 1000000,
    color: '#fff',
    height: '100%',
  },
  spinner: {
    marginBottom: 10,
  },
  message: {

  }
}));

const LoadingBackdrop = () => {
  const app = useSelector((state: StoreState) => state.general);
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={app.loading.status}>
      <CircularProgress color="inherit" className={classes.spinner} />
      {app.loading.message && (
        <Typography className={classes.message}>
          {app.loading.message}
        </Typography>
      )}
    </Backdrop>
  );
};

export default LoadingBackdrop;
