import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  noApps: {
    color: 'grey',
    fontStyle: 'italic',
  },
  appCard: {
    display: 'flex',
    borderBottom: '1px solid lightgray',
    padding: 17,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    "&:hover, &:focus": {
      backgroundColor: '#F6F7FB',
      cursor: 'pointer',
    }
  },
  appCardLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  appCardName: {
    width: 150,
  },
  appCardEnvs: {
    fontSize: 13,
    marginLeft: 30,
    color: '#5367FF'
  }
});

export default useStyles;
