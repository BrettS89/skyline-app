import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import useStyles from './styles';
import { capitalize } from '../../utilities';

const prices = {
  'development': '10.00',
  'production': '20.00',
};

const CheckoutView = ({ plan }) => {
  const classes = useStyles();

  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState();

  return (
    <div className='container'>
      <div className={classes.content}>
        <div className={classes.left}>
          <Typography variant='h5' className='title-margin'>
            Checkout Details
          </Typography>
          <div className={classes.lineRow}>
            <Typography variant='h6' className={classes.lineItem}>
              <span className={classes.grey}>Plan:</span> Skyline {capitalize(plan)}
            </Typography>
          </div>
          <div className={classes.lineRow}>
            <Typography variant='h6' className={classes.lineItem}>
              <span className={classes.grey}>Amount:</span> ${prices[plan]}
            </Typography>
          </div>
          <div className={classes.lineRow}>
            <Typography variant='h6' className={classes.lineItem}>
              Billed monthly
            </Typography>
          </div>
        </div>
        <div className={classes.right}>
          <Typography variant='h5' className='title-margin'>
            Payment Information
          </Typography>
          <div className={classes.cardInput}>
            <Typography className={classes.label}>Card number</Typography>
            <TextField
              variant='outlined'
              placeholder='1234 5678 9012 3456'
              size='small'
              className={classes.textInput}
            />
          </div>
          <div className={classes.cardInput}>
            <Typography className={classes.label}>Expiration date</Typography>
            <TextField
              variant='outlined'
              placeholder='MM/YY'
              size='small'
              className={classes.textInput}
            />
          </div>
          <div className={classes.cardInput}>
            <Typography className={classes.label}>CVC</Typography>
            <TextField
              variant='outlined'
              placeholder='123'
              size='small'
              className={classes.textInput}
            />
          </div>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            className={classes.button}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
