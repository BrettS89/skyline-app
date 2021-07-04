import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  appBar: {
    // height: 0
  },
  logo: {
    paddingTop: 2,
    marginLeft: 3,
    letterSpacing: 2,
    fontWeight: 600,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
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
  }
});

export default useStyles;
