import { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import KeyValue from '../../../../components/key-value';
import useStyles from '../styles';

const Https = ({ addEc2HttpsListener, addHttpsListener, certificates, hosting }) => {
  const classes = useStyles();

  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const onAddCertificate = () => {
    if (hosting.autoscale) {
      addHttpsListener(selectedCertificate);
    } else {
      addEc2HttpsListener(selectedCertificate);
    }
  };

  const renderSelect = () => (
    <>
      <div className={classes.sslSelect}>
        <Autocomplete
          size="small"
          options={certificates}
          getOptionLabel={(option: any) => `${option.domain} - ${option.status}`}
          getOptionDisabled={(option: any) => option.status.includes('PENDING')}
          onChange={(event, newValue) => setSelectedCertificate(newValue|| null)}
          renderInput={(params) => (
            <TextField
              className={classes.longerDropdown}
              size="small" {...params}
              placeholder="Select an ssl certificate"
              variant="outlined"
            />
          )}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        disableElevation
        disabled={!selectedCertificate}
        onClick={onAddCertificate}
      >
        Apply
      </Button>
    </>
  );

  const renderView = () => {
    if (hosting.autoscale) {
      return (
        <>
          <div className={classes.statusKvp}>
            <KeyValue
              keyText='Domain:'
              value={hosting.domain_name.trim()}
              width={140}
              marginRight={5}
            />
          </div>
          
          <div className={classes.statusKvp}>
            <KeyValue
              keyText='SSL certificate arn:'
              value={hosting.ssl_certificate_arn.trim()}
              width={140}
              marginRight={5}
            />
          </div>
        </>
      );
    }

    return (
      <>
      <div className={classes.statusKvp}>
        <KeyValue
          keyText='Domain:'
          value={hosting.domain_name.trim()}
          width={140}
          marginRight={5}
        />
      </div>

      <div className={classes.statusKvp}>
        <KeyValue
          keyText='HTTPS URL:'
          value={hosting.cloudfront_url.trim()}
          width={140}
          marginRight={5}
        />
      </div>

      <Typography className={classes.httpsDeployedText}>
        Your HTTPS url will take several minutes to deploy after initial setup.
      </Typography>
      </>
    );
  };

  const renderNoHosting = () => (
    <>
      <Typography>
        You must launch an AWS environment to configure HTTPS forwarding.
      </Typography>
    </>
  );

  const renderNoHosting = () => (
    <>
      <Typography>
        You must launch an autoscale environment to configure HTTPS forwarding.
      </Typography>
    </>
  );

  const renderHttps = () => {
    if (!hosting) return renderNoHosting();

    if (hosting?.ssl_certificate_arn) {
      return renderView();
    }

    return renderSelect();
  }

  return (
    <div className={classes.section}>
      {/* <Typography className={classes.label}>
        Https
      </Typography> */}
      {renderHttps()}
    </div>
  );
};

export default Https;
