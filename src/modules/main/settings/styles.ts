import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  section: {
    borderBottom: '1px solid lightgray',
    paddingBottom: 30,
    marginBottom: 25,
  },
  label: {
    fontWeight: 600,
    marginBottom: 15,
  },
  awsSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  awsConnectInput: {
    width: 300,
    marginBottom: 15
  },
  awsConnectedText: {
    color: 'gray',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  cancelButton: {
    color: 'red',
    borderColor: 'red',
    marginTop: 15,
  },
  key: {
    // color: 'gray',
  },
  value: {
    color: 'gray',
    fontStyle: 'italic',
  }
});
