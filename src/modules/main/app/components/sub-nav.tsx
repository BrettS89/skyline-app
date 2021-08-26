import Typography from '@material-ui/core/Typography';
import useStyles from '../styles';
import CloudIcon from '@material-ui/icons/Cloud';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';

const linkNames = [
  { component: 'Deploy', Icon: CloudIcon },
  { component: 'Environment Variables', Icon: CodeRoundedIcon },
  { component: 'HTTPS', Icon: VerifiedUserRoundedIcon },
  { component: 'Logs', Icon: SubjectRoundedIcon },
]

const SubNav = ({ componentName, setComponent, user }) => {
  const classes = useStyles();

  const renderLinks = () => linkNames.map(({ component, Icon }) => {
    if (user?.plan?.plan !== 'production' && component === 'HTTPS') {
      return;
    }

    const color = component === componentName
        ? '#5367FF'
        : 'gray';

    return (
      <div 
        className={`hover ${classes.subNavLink}`}
        onClick={() => setComponent(component)}
      >
        <Icon style={{ color, marginRight: 4, fontSize: 20  }} />
        <Typography style={{ color }} className={classes.subNavText}>
          {component}
        </Typography>
      </div>
    );
  });

  return (
    <div className={classes.subNav}>
      {renderLinks()}
    </div>
  );
};

export default SubNav;
