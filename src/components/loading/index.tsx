import { useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { StoreState } from '../../redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000000,
    color: '#fff',
    height: '100%',
  },
}));

const LoadingBackdrop = () => {
  const app = useSelector((state: StoreState) => state.general);
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={app.isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
