import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import InfoColumn from './components/info-column';

import CloudIcon from '@material-ui/icons/Cloud';
import GitHubIcon from '@material-ui/icons/GitHub';
import AutorenewIcon from '@material-ui/icons/Autorenew';


const Landing = () => {
  const classes = useStyles();

  return (
    <div className="container">
      <div className={classes.tron}>
        <Typography className={classes.title} variant="h4">
          {/* Deploy to <span className="blue">AWS</span> with <span className="blue">Skyline</span> */}
          Deploy to AWS with Skyline
          {/* <span className="blue">Deploy to AWS with Skyline</span> */}
        </Typography>
        <Typography className={classes.subTitle} variant="h5">
          The easiest way for developers to deploy applications to AWS.
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.leftButton}
            disableElevation
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className={classes.rightButton}
            disableElevation
          >
            Login
          </Button>
        </div>
      </div>
      <div className={classes.infoColumns}>
        <InfoColumn
          title='Connect to Github'
          content='Connect your Github account to deploy code from any of your repositories.'
          Icon={GitHubIcon}
        />
        <InfoColumn
          title='Launch AWS Environments'
          content='Launch single instance or auto-scale environments.'
          Icon={CloudIcon}
        />
        <InfoColumn
          title='Deploy Code'
          content='Choose continuous delivery with deployments triggered on code commits, or deploy manually.'
          Icon={AutorenewIcon}
        />
      </div>

      <div className={classes.benefitContainer}>
        <div className={classes.benefit}>
          <Typography variant='h5'>
            Skyline makes using AWS as easy to use as DigitalOcean or Heroku.
          </Typography>
        </div>
      </div>

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
      
    </div>
  );
};

export default Landing;
