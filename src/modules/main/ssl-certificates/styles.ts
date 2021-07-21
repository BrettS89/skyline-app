import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  noCerts: {
    color: 'grey',
    fontStyle: 'italic',
  },
  modalContent: {
    // height: 190,
    width: 400,
    display: 'flex',
    flexDirection: 'column',
  },
  domainNameInput: {
    width: '100%',
  },
  awsRegionLabel: {
    // fontWeight: 600,
    marginBottom: 5
  },
  certCard: {
    display: 'flex',
    borderBottom: '1px solid lightgray',
    padding: 17,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    // "&:hover, &:focus": {
    //   backgroundColor: '#F6F7FB',
    //   cursor: 'pointer',
    // }
  },
  certCardLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  certCardName: {
    width: 200,
  },
  cnameText: {
    fontSize: 12,
  },
  rightWidth: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 200,
  },
});
