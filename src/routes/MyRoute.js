import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const MyRoute = ({ onlyNotLoggedIn, onlyLoggedIn, onlyAdmin, component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = false;

  if (onlyNotLoggedIn && isLoggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  if (onlyLoggedIn && !isLoggedIn) {
    return <Redirect to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }} />;
  }

  if (onlyAdmin && !isAdmin) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return <Route {...rest} component={component} />;
};

MyRoute.defaultProps = {
  onlyNotLoggedIn: false,
  onlyLoggedIn: false,
  onlyAdmin: false,
};

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  onlyLoggedIn: PropTypes.bool,
  onlyAdmin: PropTypes.bool,
  onlyNotLoggedIn: PropTypes.bool,
};
