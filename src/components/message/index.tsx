import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../redux/actions';
import { StoreState } from '../../redux';

const useStyles = makeStyles({
  snackysnack: {
  },
});

const Message = () => {
  const dispatch = useDispatch();
  const general = useSelector((state: StoreState) => state.general);
  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: ActionTypes.CLOSE_SNACKBAR });
  };

  const renderMessage = () => {
    if (general.info.message.length) {
      return (
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
        >
        {general.info.message}
        </MuiAlert>
      );
    } else if (general.error.message.length) {
      return (
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
        >
          {general.error.message}
        </MuiAlert>
      );
    } 
  };

  return (
    <Snackbar
      className={classes.snackysnack}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={general.snackbarOpen}
      onClose={handleClose}
      autoHideDuration={5000}
      key={'top' + 'center'}
    >
      {renderMessage()}
    </Snackbar>
  )
};

export default Message;
