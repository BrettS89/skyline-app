import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  plansContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 50,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 30,
  },
  headerColumn: {
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  costCell: {
    marginBottom: 8,
  },
  featureRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e0e0e0',
    padding: 15,
  },
  featureText: {
    fontSize: 16,
    width: 400,
  },
  check: {
    width: 150,
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    width: 110,
  }
});
