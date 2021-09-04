import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import api from '../../feathers';
import { ActionTypes } from '../../redux';

const Contact = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async () => {
    if (!email || !message) {
      dispatch({
        type: ActionTypes.SET_APP_ERROR,
        payload: 'Email and message are required',
      });

      return;
    }

    try {
      await api
        .service('communication/message')
        .create({
          email,
          message,
        });

      dispatch({
        type: ActionTypes.SET_APP_INFO,
        payload: 'Message was successfully sent.',
      })
    } catch(e) {}
    setEmail('');
    setMessage('');
  }

  return (
    <div className='container'>
      <Typography variant='h5' className='title-margin'>
        Contact
      </Typography>
      <div className={classes.contactForm}>
        <TextField
          placeholder='Email'
          variant='outlined'
          className={classes.emailInput}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          placeholder='Message'
          multiline
          rows={5}
          variant='outlined'
          className={classes.messageInput}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button
          variant='contained'
          className={classes.submitButton}
          color='primary'
          disableElevation
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
      <div>
        <Typography className={classes.or}>
          Or
        </Typography>
        <Button
          variant='outlined'
          color='primary' 
          onClick={() => alert('609 213 1708')}
        >
          Give us a call
        </Button>
      </div>
    </div>
  );
};

export default Contact;
