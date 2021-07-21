import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles';

const CreateCertModal = ({ createCertificate, createModalOpen, setCreateModalOpen }) => {
  const classes = useStyles();

  const [domainName, setDomainName] = useState('');
  const [awsRegion, setAwsRegion] = useState(null);

  const onClose = () => {
    setCreateModalOpen(false);
    setDomainName('');
  }

  const onClickCreate = () => {
    let formattedDomainName: string;

    if (!domainName.includes('*.') && !domainName.includes('www')) {
      formattedDomainName = `*.${domainName}`;
    }

    createCertificate(awsRegion, formattedDomainName);
    onClose();
  };

  return (
    <Dialog
      open={createModalOpen}
    >
      <div className={classes.modalContent}>
        <DialogTitle>
          Enter your domain name
        </DialogTitle>
        <DialogContent>
          <TextField
            placeholder='example-domain.com'
            variant='outlined'
            size='small'
            className={classes.domainNameInput}
            onChange={e => setDomainName(e.target.value)}
            value={domainName}
          />
        </DialogContent>
        <DialogContent>
          <Typography className={classes.awsRegionLabel}>AWS Region (Must match your app)</Typography>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1"  onChange={e => setAwsRegion(e.target.value)}>
              <FormControlLabel value="us-east-1" control={<Radio color="primary" size='small' />} label="us-east-1" />
              <FormControlLabel value="us-east-2" control={<Radio color="primary" size='small'  />} label="us-east-2" />
              <FormControlLabel value="us-west-1" control={<Radio color="primary" size='small'  />} label="us-west-1" />
              <FormControlLabel value="us-west-2" control={<Radio color="primary" size='small'  />} label="us-west-2" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            color='primary'
            variant='contained'
            onClick={onClickCreate}
            disableElevation={true}
            disabled={!awsRegion || !domainName}
          >
            Create
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
};

export default CreateCertModal;
