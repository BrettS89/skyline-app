import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  kvpContainer: {
    display: 'flex',
  },
  key: {
    color: 'grey',
    marginRight: 50,
    width: 50,
  },
});

const KeyValue = ({ keyText, value }) => {
  const classes = useStyles();

  return (
    <div className={classes.kvpContainer}>
      <Typography className={classes.key}>{keyText}</Typography>
      <Typography>{value}</Typography>
    </div>
  );
};

export default KeyValue;
