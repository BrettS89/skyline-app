import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { StoreState } from '../../redux';
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { features } from './utilities';
import FeatureRow from './components/row';

const SubscribeView = ({ navigate }) => {
  const classes = useStyles();

  const user = useSelector((state: StoreState) => state.user.details);

  const subscribedToDevelopment =
    user?.plan?.plan === 'development' || user?.plan?.plan === 'production';

  const subscribedToProduction = user?.plan?.plan === 'production';

  return (
    <div className='container'>
      <Typography variant="h5" className='title-margin'>Subscription Plans</Typography>

      <div className={classes.plansContainer}>
        <div className={classes.topRow}>
          <div className={classes.featureText} />
          <div className={classes.headerColumn}>
            <Typography variant='h6'>Sandbox</Typography>
            <Typography variant='h6' className={classes.costCell}>Free</Typography>
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              onClick={() => navigate('sandbox')}
              disabled={!!user}
              className={classes.btn}
            >
              Sign up
            </Button>
          </div>
          <div className={classes.headerColumn}>
            <Typography variant='h6'>Development</Typography>
            <Typography variant='h6' className={classes.costCell}>$10/mo</Typography>
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              onClick={() => navigate('development')}
              disabled={subscribedToDevelopment}
            >
              Subscribe
            </Button>
          </div>
          <div className={classes.headerColumn}>
            <Typography variant='h6'>Production</Typography>
            <Typography variant='h6' className={classes.costCell}>$20/mo</Typography>
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              onClick={() => navigate('production')}
              disabled={subscribedToProduction}
            >
              Subscribe
            </Button>
          </div>
        </div>
        {features.map(f => (
          <FeatureRow
            feature={f.feature}
            sandboxCheck={f.sandboxCheck}
            developmentCheck={f.developmentCheck}
            productionCheck={f.productionCheck}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscribeView;
