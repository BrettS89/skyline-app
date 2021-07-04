import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  label: {
    fontWeight: 600,
    marginBottom: 15,
  },
  section: {
    borderBottom: '1px solid lightgray',
    paddingBottom: 30,
    marginBottom: 25,
  },
  nameInput: {
    width: 300,
  },
  envDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  createAppBtnDiv: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

export default useStyles;
