import ReactGA from 'react-ga';
import { get } from 'lodash';

export const googleAnalyticsSetup = () => {
  ReactGA.initialize('UA-216817757-1');
};

export const PageRoutesTracking = (props) => {
  const pathname = get(props, 'match.path', '*');
  let pathView;

  if (pathname === '*') pathView = 'not-found';
  else pathView = pathname;

  ReactGA.pageview(pathView);

  return null;
};
