import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../../redux/actions';
import api from '../../../feathers';
import useStyles from './styles'

const Signup = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSignup = async (e) => {
    e.preventDefault();
    dispatch({ type: ActionTypes.SET_APP_LOADING, payload: { status: true } });

    try {
      const res = await api
        .service('security/user')
        .create({
          email: e.target.email.value,
          password: e.target.password.value,
        });

      const { user, token } = await api
        .service('security/session')
        .create({
          email: e.target.email.value,
          password: e.target.password.value,
        })

      localStorage.setItem('token', token);
      dispatch({ type: ActionTypes.SET_USER, payload: user });

      // GET MY APPS
      dispatch({
        type: ActionTypes.GET_MY_APPS,
      });

      // GET GITHUB REPOS
      if (user.github_access_key) {
        dispatch({
          type: ActionTypes.GET_GITHUB_REPOS,
        });
      }

      dispatch({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });
      props.history.push('/apps');
    } catch(e) {
      dispatch({ type: ActionTypes.SET_APP_LOADING, payload: { status: false } });
      dispatch({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div>
        <form className={classes.form} onSubmit={onSignup}>
          <Typography variant="h4" className={classes.title}>
            Create an Account
          </Typography>
          <div className={classes.loginFormInputs}>
            <TextField
              name="email"
              margin="dense"
              id="email"
              label="Email"
              type="text"
              variant="outlined"
              autoComplete="off"
              className={classes.emailInput}
            />
            <TextField
              name="password"
              margin="dense"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              autoComplete="off"
            />
          </div>
            <Button type="submit"   variant="contained" size="large" color="primary" disableElevation>
              Sign Up
            </Button>          
        </form>
      </div>
    </div>
  );
};

export default Signup;
