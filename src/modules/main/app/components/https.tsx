import { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import KeyValue from '../../../../components/key-value';
import useStyles from '../styles';

const Https = ({ addHttpsListener, certificates, hosting }) => {
  const classes = useStyles();

  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const onAddCertificate = () => {
    addHttpsListener(selectedCertificate);
    setSelectedCertificate(null);
  };

  const renderSelect = () => (
    <>
      <div className={classes.sslSelect}>
        <Autocomplete
          size="small"
          options={certificates}
          getOptionLabel={(option: any) => option.name}
          getOptionDisabled={(option: any) => option.name.includes('PENDING')}
          onChange={(event, newValue) => setSelectedCertificate(newValue?.CertificateArn || null)}
          renderInput={(params) => (
            <TextField
              className={classes.longDropdown}
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

  const renderView = () => (
    <>
      <KeyValue
        keyText='SSL certificate arn:'
        value={hosting.ssl_certificate_arn.trim()}
        width={140}
        marginRight={5}
      />
    </>
  );

  const renderHttps = () => {
    if (hosting.ssl_certificate_arn) {
      return renderView();
    }

    return renderSelect();
  }

  return (
    <div className={classes.section}>
      <Typography className={classes.label}>
        Https
      </Typography>
      {renderHttps()}
    </div>
  );
};

export default Https;
