import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const SSLCertificatesView = () => {
  const classes = useStyles();

  return (
    <div className="container">
      <div className="row-space-centered title-margin">
        <Typography variant="h5">SSL Certificates</Typography>
        <Button
          disableElevation
          variant="outlined"
          color="primary"
          // onClick={() => navigateTo('/create-app')}
        >
          Create new certificate
        </Button>
      </div>
    </div>
  )
};

export default SSLCertificatesView;
