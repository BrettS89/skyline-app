import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import CreateCertModal from './components/create-cert-modal';
import CertificateRow from './components/certificate-row';

const SSLCertificatesView = ({ certificates, createCertificate, createModalOpen, setCreateModalOpen }) => {
  const classes = useStyles();

  const renderCertificates = () => {
    return certificates.map(c => {
      return (
        <CertificateRow
          key={c._id}
          certificate={c}
        />
      );
    });
  };

  const renderNoCertificatesMessage = () => {
    if (certificates.length) return;

    return (
      <Typography className={classes.noCerts}>
        You currently have no SSL certificates in Skyline. Click 'Create new certificate' to get started.
      </Typography>
    )
  };

  return (
    <div className="container">
      <div className="row-space-centered title-margin">
        <Typography variant="h5">SSL Certificates</Typography>
        <Button
          disableElevation
          variant="outlined"
          color="primary"
          onClick={() => setCreateModalOpen(true)}
        >
          Create new certificate
        </Button>
      </div>
      <div>
        {renderNoCertificatesMessage()}
        {renderCertificates()}
      </div>
      <CreateCertModal
        createCertificate={createCertificate}
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
      />
    </div>
  );
};

export default SSLCertificatesView;
