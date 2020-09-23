import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import HomePage from '../pages/HomePage';
import LogIn from '../pages/LogIn';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/login" component={LogIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
