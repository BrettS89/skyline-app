import { Route, Switch } from 'react-router-dom';

import Landing from '../modules/landing';
import Login from '../modules/auth/login';
import Signup from '../modules/auth/signup';
import MyApps from '../modules/main/my-apps';
import App from '../modules/main/app';
import CreateApp from '../modules/main/create-app';
import SSLCerts from '../modules/main/ssl-certificates';
import Settings from '../modules/main/settings';
import Subscribe from '../modules/pricing';
import Checkout from '../modules/checkout';
import Contact from '../modules/contact';
import Terms from '../modules/terms';

export default () => {
  return (
    <Switch>
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/checkout/:plan" component={Checkout} />
      <Route exact path="/pricing" component={Subscribe} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/ssl-certificates" component={SSLCerts} />
      <Route exact path="/create-app" component={CreateApp} />
      <Route exact path="/apps/:id" component={App} />
      <Route exact path="/apps" component={MyApps} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Landing} />
    </Switch>
  );
};
