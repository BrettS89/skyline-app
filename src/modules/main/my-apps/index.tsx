import { useSelector } from 'react-redux';
import { StoreState } from '../../../redux';
import authorization from '../../../components/authorization';
import View from './view';

const MyApps = (props) => {
  const app = useSelector((state: StoreState) => state.app);

  const navigateTo = (path: string): void => {
    props.history.push(path);
  };

  return (
    <View
      myApps={app.myApps}
      navigateTo={navigateTo}
    />
  );
};

export default authorization(MyApps);
