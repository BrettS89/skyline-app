import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '75%',
    width: 300
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
  },
  emailInput: {
    marginBottom: 7,
  },
  loginFormInputs: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    marginBottom: 15,
  },
});
