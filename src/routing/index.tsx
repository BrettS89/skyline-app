import { Route, Switch } from 'react-router-dom';

import Landing from '../modules/landing';
import Login from '../modules/auth/login';
import MyApps from '../modules/main/my-apps';
import App from '../modules/main/app';
import CreateApp from '../modules/main/create-app';
import SSLCerts from '../modules/main/ssl-certificates';

export default () => {
  return (
    <Switch>
      <Route exact path="/ssl-certificates" component={SSLCerts} />
      <Route exact path="/create-app" component={CreateApp} />
      <Route exact path="/apps/:id" component={App} />
      <Route exact path="/apps" component={MyApps} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Landing} />
    </Switch>
  );
};
