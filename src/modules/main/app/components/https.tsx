import { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from '../styles';

const Https = ({ addHttpsListener, certificates }) => {
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

  return (
    <div className={classes.section}>
      <Typography className={classes.label}>
        Https
      </Typography>

      {renderSelect()}
    </div>
  );
};

export default Https;
