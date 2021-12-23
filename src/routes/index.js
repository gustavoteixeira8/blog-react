import React from 'react';
import { Switch } from 'react-router-dom';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { MyRoute } from './MyRoute';

export const AppRoutes = () => {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute exact path="/register" component={Login} />
      <MyRoute path="*" component={NotFound} />
    </Switch>
  );
};
