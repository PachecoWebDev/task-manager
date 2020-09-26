import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';

import { persistor, store } from './store/index.js';
import Toast from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toast>
          <Routes />
        </Toast>
      </PersistGate>
    </Provider>

    <GlobalStyle />
  </Router>
);

export default App;
