import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import api from '../../../../feathers';
import useStyles from '../styles';
import LogModal from './log-modal';

const Logs = ({ hosting }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [logModalOpen, setLogModalOpen] = useState(false);

  const viewLogs = (logEvents) => {
    setSelectedLogs(logEvents);
    setLogModalOpen(true);
  }

  const renderNoHosting = () => (
    <>
      <Typography>
        Once you launch an AWS environment you can view logs here.
      </Typography>
    </>
  );

  const renderLoading = () => (
    <Typography>
      Loading...
    </Typography>
  );

  const renderLogs = () => logs.map((log, i) => {
    return (
      <div className={classes.instanceRow}>
        <Typography>
          EC2 Instance {i + 1}:
        </Typography>
        <Button
          color='primary'
          className={classes.viewLogsButton}
          onClick={() => viewLogs(log.logs)}
        >
          View logs
        </Button>
      </div>
    );
  });

  const fetchLogs = async () => {
    if (hosting?.log_id) {
      setIsLoading(true);

      const logData = await api
        .service('aws/log')
        .get(hosting.log_id);

        setLogs(logData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [hosting]);

  if (!hosting?.log_id) return renderNoHosting();
  if (isLoading) return renderLoading();
  return (
    <>
      {renderLogs()}
      <LogModal
        logs={selectedLogs}
        modalOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
      />
    </>
  );
};

export default Logs;
