import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles';

const LogModal = ({ logs, modalOpen, onClose }) => {
  const classes = useStyles();

  const renderLogs = () => logs.map(l => <Typography className={classes.logsText}>{l}</Typography>);

  return (
    <Dialog
      open={modalOpen}
      className={classes.logModal}
      fullScreen
    >
      <div className={classes.modalContent}>
        {/* <DialogTitle>
          Logs
        </DialogTitle> */}
        <DialogContent>
          <div className={classes.logsContent}>
            {renderLogs()}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color='primary'
            variant='contained'
            disableElevation
          >
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default LogModal;
