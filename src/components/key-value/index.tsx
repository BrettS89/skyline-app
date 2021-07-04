import { Typography } from '@material-ui/core';

const KeyValue = ({ keyText, value, width=50, marginRight=50 }) => {
  const styles = {
    kvpContainer: {
      display: 'flex',
    },
    key: {
      color: 'grey',
      marginRight: marginRight,
      width: width,
    },
  }

  return (
    <div style={styles.kvpContainer}>
      <Typography style={styles.key}>{keyText}</Typography>
      <Typography>{value}</Typography>
    </div>
  );
};

export default KeyValue;
