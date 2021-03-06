import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  appBar: {
    height: 60
  },
  logo: {
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
    marginLeft: 10,
    fontSize: 14,
  },
  link: {
    color: '#fff',
    marginLeft: 10
  },
  userIcon: {
    marginLeft: 25,
  },
  planText: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingTop: 6,
    marginLeft: 10,
    fontSize: 14,
  },
  planName: {
    fontStyle: 'italic',
  }
});

export default useStyles;
