import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';

import { AuthUser } from './hooks/auth';

const App: React.FC = () => (
  <Router>
    <AuthUser>
      <Routes />
    </AuthUser>

    <GlobalStyle />
  </Router>
);

export default App;
