import ReactGA from 'react-ga';
import { browserHistory } from '../services/browserHistory';

export const googleAnalyticsSetup = () => {
  ReactGA.initialize('UA-216817757-1');
};

export const pageRoutesTracking = () => {
  browserHistory.listen((obj) => {
    const pathname = `${obj.pathname}${obj.search}`;

    let pathView;

    if (pathname === '*') pathView = 'not-found';
    else pathView = pathname;

    ReactGA.pageview(pathView);
  });

  return null;
};
