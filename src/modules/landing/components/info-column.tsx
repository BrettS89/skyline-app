import Typography from '@material-ui/core/Typography';
import useStyles from '../styles';

const InfoColumn = ({ title, content, Icon }) => {
  const classes = useStyles();

  return (
    <div className={classes.infoColumn}>
      <Icon style={{ color: '#5367FF', textAlign: 'center', fontSize: 50, marginBottom: 15 }} />
      <Typography variant="h5" className={classes.infoColumnTitle}>
        {title}
      </Typography>
      <Typography>
        {content}
      </Typography>
    </div>
  );
};

export default InfoColumn;
