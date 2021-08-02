import { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import KeyValue from '../../../../components/key-value';
import useStyles from '../styles';

const Https = ({ addEc2HttpsListener, addHttpsListener, certificates, hosting }) => {
  const classes = useStyles();

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [domainName, setDomainName] = useState('');

  const onAddCertificate = () => {
    if (hosting.autoscale) {
      addHttpsListener(selectedCertificate);
    } else {
      if (!domainName) {
        alert('Please include a domain name');
        return;
      }

      addEc2HttpsListener(selectedCertificate, domainName);
    }
  };

  const renderDomainInput = () => (
    <div>
      <TextField
        placeholder='Domain e.g. example.com or sub.example.com'
        onChange={e => setDomainName(e.target.value)}
        value={domainName}
        variant='outlined'
        className={classes.longerDropdown}
        size='small'
      />
    </div>
  );

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
        {!hosting.autoscale && renderDomainInput()}
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

  const renderNoHosting2 = () => (
    <>
      <Typography>
        Launch an AWS environment to configure HTTPS forwarding.
      </Typography>
    </>
  );

  const renderHttps = () => {
    if (!hosting) return renderNoHosting2();

    if (hosting?.ssl_certificate_arn) {
      return renderView();
    }

    return renderSelect();
  }

  return (
    <div className={classes.section}>
      {renderHttps()}
    </div>
  );
};

export default Https;
