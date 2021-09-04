import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  emailInput: {
    width: 600,
    marginBottom: 15,
  },
  messageInput: {
    width: 600,
    marginBottom: 15,
  },
  submitButton: {
    width: 100,
  },
  or: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 600,
    fontSize: 14,
  }
});
