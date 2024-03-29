import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';
import { GlobalStyles, Wrapper } from './styles/globalStyles';
import { Header } from './components/Header';
import { AppRoutes } from './routes';
import { GlobalEvents } from './components/GlobalEvents';
import { browserHistory } from './services/browserHistory';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Footer } from './components/Footer';
import { HelmetProvider } from 'react-helmet-async';
// import { googleAnalyticsSetup, pageRoutesTracking } from './config/googleAnalytics';

const App = function () {
  // googleAnalyticsSetup();
  // pageRoutesTracking();

  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={browserHistory} location={browserHistory.location}>
            <Wrapper>
              <GlobalEvents />
              <Header />
              <GlobalStyles />
              <AppRoutes />
              <ToastContainer
                autoClose={4000}
                className="toast-container"
                pauseOnFocusLoss={true}
                theme="dark"
                toastClassName={Math.random()}
                closeOnClick
                limit={6}
                closeButton
                draggable
              />
            </Wrapper>

            <Footer />
          </Router>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
