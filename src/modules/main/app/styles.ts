import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexGrow: 1,
  },
  left: {
    width: 200,
  },
  environmentDiv: {
    marginBottom: 6,
  },
  environmentName: {
    color: 'gray',
    fontSize: 18,
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'auto',
  },
  subNav: {
    display: 'flex',
    marginBottom: 30,
  },
  subNavLink: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 30,
  },
  subNavText: {
  },
  label: {
    fontWeight: 600,
    marginBottom: 15,
  },
  section: {
    borderBottom: '1px solid lightgray',
    paddingBottom: 30,
    marginBottom: 25,
  },
  envVars: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  envVarDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  envVarText: {
    color: 'gray',
    fontStyle: 'italic',
  },
  envVarDelete: {
    fontSize: 14,
    color: 'lightgray',
    height: 20,
  },
  envVarInput: {
    marginBottom: 10,
    width: 400,
  },
  deployDropdownDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  longDropdown: {
    width: 300,
    marginBottom: 10,
  },
  longerDropdown: {
    width: 375,
    marginBottom: 10,
  },
  shortDropdown: {
    width: 175,
  },
  deployOnCommitDiv: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10
  },
  branchDiv: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 25,
  },
  statusTitle: {
    marginBottom: 10,
    fontStyle: 'italic'
  },
  deleteButton: {
    color: 'gray',
    marginLeft: 10,
    marginBottom: 10,
  },
  deleteAppText: {
    color: 'grey',
  },
  statusKvp: {
    marginBottom: 4,
  },
  deployBtn: {
    marginTop: 20,
  },
  sslSelect: {
    marginBottom: 15,
  },
  httpsDeployedText: {
    color: 'grey',
    fontStyle: 'italic',
    marginTop: 15,
    fontSize: 14,
  }
});

export default useStyles;
