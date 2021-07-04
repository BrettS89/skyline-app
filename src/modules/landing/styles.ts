import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  tron: {
    height: 250,
    backgroundColor: '#ebebeb',
    borderRadius: 4,
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 35,
    // fontWeight: 600,
    textAlign: 'center'
  },
  leftButton: {
    marginRight: 5
  },
  rightButton: {
    marginLeft: 5
  }
});
