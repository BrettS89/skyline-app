import { FC } from 'react';
import useStyles from '../styles';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

interface Props {
  feature: string;
  developmentCheck: boolean;
  productionCheck: boolean;
  sandboxCheck: boolean;
}

const Row: FC<Props> = ({ feature, developmentCheck, productionCheck, sandboxCheck }) => {
  const classes = useStyles();

  const renderCheck = (shouldRender: boolean) =>
    shouldRender
      ? <CheckRoundedIcon />
      : <div />;

  return (
    <div className={classes.featureRow}>
      <div className={classes.featureText}>{feature}</div>
      <div className={classes.check}>{renderCheck(sandboxCheck)}</div>
      <div className={classes.check}>{renderCheck(developmentCheck)}</div>
      <div className={classes.check}>{renderCheck(productionCheck)}</div>
    </div>
  )
};

export default Row;
