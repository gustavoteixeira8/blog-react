import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';
import { GlobalStyles } from './styles/globalStyles';
import { Header } from './components/Header';
import { AppRoutes } from './routes';
import { browserHistory } from './services/browserHistory';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const App = function () {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={browserHistory} location={browserHistory.location}>
          <Header />
          <GlobalStyles />
          <AppRoutes />
          <ToastContainer
            autoClose={5000}
            className="toast-container"
            pauseOnFocusLoss={true}
            theme="dark"
          />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
