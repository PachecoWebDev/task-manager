import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import LogIn from '../pages/LogIn';
import Dashboard from '../pages/Dashboard';
import EditCountrie from '../pages/EditCountrie';
import NewCountry from '../pages/NewCountry';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LogIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/new-country" component={NewCountry} isPrivate />
    <Route path="/edit-country" component={EditCountrie} isPrivate />
  </Switch>
);

export default Routes;
