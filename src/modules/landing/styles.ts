import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  tron: {
    marginBottom: 60,
    height: 170,
    borderBottom: '1px solid lightgray',
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 15,
    textAlign: 'center'
  },
  subTitle: {
    marginBottom: 20,
  },
  leftButton: {
    marginRight: 5,
    marginBottom: 20
  },
  rightButton: {
    marginLeft: 5, 
    marginBottom: 20
  },
  infoColumns: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  infoColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    textAlign: 'center',
  },
  infoColumnTitle: {
    marginBottom: 7,
  },
  benefitContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  benefit: {
    backgroundColor: '#5367FF',
    width: '100%',
    padding: 30,
    color: '#fff',
    height: 60,
    borderRadius: 4,
    marginBottom: 85,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supported: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid lightgray',
    paddingBottom: 60,
    marginBottom: 60
  },
  supportedSection: {
    display: 'flex',
    flexDirection: 'column',
    // width: 265
  },
  supportedTitle: {
    marginBottom: 10,
    color: '#5367FF',
  },
  feature: {
    marginBottom: 5,
  },
  videoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  videoTitleSection: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start'
  },
  videoTitle: {
    marginBottom: 60,
  },
});
