import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const MyRoute = ({ authRequired, adminRequired, component, ...rest }) => {
  const isLoggedIn = false;
  const isAdmin = false;

  if (authRequired && !isLoggedIn) {
    return <Redirect to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }} />;
  }

  if (adminRequired && !isAdmin) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return <Route {...rest} component={component} />;
};

MyRoute.defaultProps = {
  authRequired: false,
  adminRequired: false,
};

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  authRequired: PropTypes.bool,
  adminRequired: PropTypes.bool,
};
