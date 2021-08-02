import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InfoColumn from './components/info-column';
import useStyles from './styles';

import CloudIcon from '@material-ui/icons/Cloud';
import GitHubIcon from '@material-ui/icons/GitHub';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import FilterDramaRoundedIcon from '@material-ui/icons/FilterDramaRounded';

const Landing2 = () => {
  const classes = useStyles();

  return (
    <div className={classes.landingPage}>
      <div className={classes.jumbotronSection}>
        <div className={classes.jumboContent}>
          <div className={classes.jumboLeft}>
            <Typography variant='h2' className={classes.jumboTitle}>Deploy to AWS with Skylilne</Typography>
            <Typography variant='h5' className={classes.jumboTitle}>The easiest way for developers to deploy applications to AWS.</Typography>
            <Button variant='outlined' color='inherit' size='large' className={classes.accessButton}>Request Early Access</Button>
          </div>
          <div className={classes.jumboRight}>
            <FilterDramaRoundedIcon style={{ fontSize: 350 }} />
          </div>
        </div>
      </div>
      <div className={classes.iconsSection}>
        <div className={classes.iconsContent}>
          <InfoColumn
            title='Connect to Github'
            content='Connect your Github account to deploy code from any of your repositories.'
            Icon={GitHubIcon}
          />
          <InfoColumn
            title='Launch AWS Environments'
            content='Launch various single instance or autoscale environments.'
            Icon={CloudIcon}
          />
          <InfoColumn
            title='Deploy Code'
            content='Setup continuous delivery or choose to deploy code manually.'
            Icon={AutorenewIcon}
          />
        </div>
      </div>
      <div className={classes.bannerSection}>
        <Typography variant='h4'>
          Focus on writing code, not searching for AWS tutorials.
        </Typography>
      </div>
      <div className={classes.featuresSection}>
        <div className={classes.supported}>
          <div className={classes.supportedSection}>
            <Typography variant='h5' className={classes.supportedTitle}>
              Features
            </Typography>
            <Typography variant='h6' className={classes.feature}>Environment creation</Typography>
            <Typography variant='h6' className={classes.feature}>Continuous deployment</Typography>
            <Typography variant='h6' className={classes.feature}>SSL certificate</Typography>
            <Typography variant='h6' className={classes.feature}>Automated https setup</Typography>
          </div>
          <div className={classes.supportedSection} style={{ width: 265 }}>
            <Typography variant='h5' className={classes.supportedTitle}>
              Supported Environments
            </Typography>
            <Typography variant='h6' className={classes.feature}>EC2</Typography>
            <Typography variant='h6' className={classes.feature}>Elastic Beanstalk</Typography>
            <Typography variant='h6' className={classes.feature}>Elastic Kubernetes Service (comming soon)</Typography>
          </div>
          <div className={classes.supportedSection}>
            <Typography variant='h5' className={classes.supportedTitle}>
              Supported Platforms
            </Typography>
            <Typography variant='h6' className={classes.feature}>Docker</Typography>
            <Typography variant='h6' className={classes.feature}>Node.js</Typography>
            <Typography variant='h6' className={classes.feature}>Python</Typography>
            <Typography variant='h6' className={classes.feature}>Ruby</Typography>
          </div>
        </div>
      </div>
      <div className={classes.videoSection}>
        <div className={classes.videoTitleSection}>
          <Typography className={classes.videoTitle} variant='h5' color='primary'>
            See How it Works
          </Typography>
        </div>
        
        <iframe
          width="1200" height="800"
          src="https://www.youtube.com/embed/qQB2NXfJev0"
        >
        </iframe>
      </div>
      <div className={classes.footer}>
        <Typography>
          Skyline 2021
        </Typography>
      </div>
    </div>
  );
};

export default Landing2;
