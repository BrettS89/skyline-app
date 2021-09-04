import { useState } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import useStyles from './styles';
import { capitalize } from '../../utilities';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';

const prices = {
  'development': '10.00',
  'production': '20.00',
};

const CheckoutView = ({ checkout, onUpgrade, plan, user }) => {
  const classes = useStyles();
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleChange = (e) => {
    const fnMap = {
      cardNumber: setCardNumber,
      expiryDate: setExpDate,
      cvc: setCvc
    };

    const changeFn = fnMap[e.target.name];

    if (!changeFn) {
      return;
    }

    changeFn(e.target.value);
  };

  const handleCheckout = () => {
    checkout(cardNumber, expDate, cvc);
  };

  const renderSubscribe = () => (
    <>
      <Typography variant='h5' className='title-margin'>
        Payment Information
      </Typography>
      <div className={classes.cardInput}>
        <Typography className={classes.label}>Card number</Typography>
        <TextField
          variant='outlined'
          size='small'
          className={classes.textInput}
          inputProps={getCardNumberProps({ onChange: handleChange })}
          value={cardNumber}
        />
      </div>
      <div className={classes.cardInput}>
        <Typography className={classes.label}>Expiration date</Typography>
        <TextField
          variant='outlined'
          size='small'
          className={classes.textInput}
          inputProps={getExpiryDateProps({ onChange: handleChange })}
          value={expDate}
        />
      </div>
      <div className={classes.cardInput}>
        <Typography className={classes.label}>CVC</Typography>
        <TextField
          variant='outlined'
          size='small'
          className={classes.textInput}
          inputProps={getCVCProps({ onChange: handleChange })}
          value={cvc}
        />
      </div>
      <Button
        variant='contained'
        color='primary'
        disableElevation
        className={classes.button}
        onClick={handleCheckout}
        disabled={user?.plan?.plan === 'production'}
      >
        Subscribe
      </Button>
    </>
  );

  const renderUpgrade = () => (
    <>
      <Typography variant='h5' className='title-margin'>
        Card on File
      </Typography>
      <div className={classes.cardInfo}>
        <CreditCardRoundedIcon style={{ fontSize: 32, marginRight: 10 }} />
        <Typography>
          {user?.stripe?.card_brand} ending in {user?.stripe?.card_last_4}
        </Typography>
      </div>
      <Button
        variant='contained'
        color='primary'
        disableElevation
        className={classes.button}
        onClick={onUpgrade}
      >
        Upgrade plan
      </Button>
      <Typography className={classes.proRatedText}>
        You will be charged today for the pro-rated amount for the updgraded plan based on the remaining days in you billing cycle. 
      </Typography>
    </>
  );

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
          {
            user?.plan?.plan === 'development'
              ? renderUpgrade()
              : renderSubscribe()
          }
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
