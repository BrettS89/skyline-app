import Typography from '@material-ui/core/Typography';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import DescriptionIcon from '@material-ui/icons/Description';
import useStyles from '../styles';

const CertificateRow = ({ certificate }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.certCard}
      // onClick={() => navigateTo(`apps/${app._id}`)}
      >
      <div className={classes.certCardLeft}>
        <DescriptionIcon style={{ fontSize: 28, marginRight: 15, color: '#5367FF' }} />
        <div className={classes.certCardName}>
          <Typography>
            {certificate.domain}
          </Typography>
        </div>
      </div>

      <div>
        <Typography className={classes.cnameText}>
          CNAME
        </Typography>
        <Typography className={classes.cnameText}>
          Name:  {certificate.cname?.name}
        </Typography>
        <Typography className={classes.cnameText}>
          Value: {certificate.cname?.value}
        </Typography>
      </div>

      <div className={classes.rightWidth}>
        <MoreHorizRoundedIcon style={{ fontSize: 28 }} />
      </div>
    </div>
  );
};

export default CertificateRow;
