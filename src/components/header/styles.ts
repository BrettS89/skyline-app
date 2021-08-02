import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  appBar: {
    height: 60
  },
  logo: {
    paddingTop: 2,
    marginLeft: 2,
    letterSpacing: 2,
    fontWeight: 600,
    fontSize: 20,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  leftItems: {
    display: 'flex',
    alignItems: 'center'
  },
  rightItems: {
    display: 'flex',
    alignItems: 'center',
  },
  beta: {
    marginLeft: 12,
    fontSize: 14,
    paddingTop: 1,
  },
  link: {
    color: '#fff',
    marginLeft: 10
  },
  userIcon: {
    marginLeft: 25,
  }
});

export default useStyles;
