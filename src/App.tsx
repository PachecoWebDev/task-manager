import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './config/ReactotronConfig.js';

import GlobalStyle from './styles/global';

import { persistor, store } from './store/index.js';
import Toast from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Toast>
          <Routes />
        </Toast>

        <ToastContainer autoClose={3000} />
        <GlobalStyle />
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
