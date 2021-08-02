import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  landingPage: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  jumbotronSection: {
    display: 'flex',
    backgroundColor: '#5367FF',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  jumboContent: {
    display: 'flex',
    width: '100%',
    maxWidth: 1200,
    color: '#fff',
  },
  jumboLeft: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 20
  },
  jumboTitle: {
    marginBottom: 20,
  },
  accessButton: {
    color: '#fff',
    width: 200,
  },
  jumboRight: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
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
  iconsSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 80,
  },
  iconsContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1200,
  },
  bannerSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    height: 150,
    marginBottom: 80,
  },
  featuresSection: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  supported: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    maxWidth: 1200,
    // borderBottom: '1px solid lightgray',
    // paddingBottom: 80,
    marginBottom: 80
  },
  supportedSection: {
    display: 'flex',
    flexDirection: 'column',
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
    marginBottom: 80,
  },
  videoTitleSection: {
    display: 'flex',
    width: '100%',
    maxWidth: 1200,
    justifyContent: 'flex-start'
  },
  videoTitle: {
    marginBottom: 40,
  },
  footer: {
    display: 'flex',
    height: 70,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
