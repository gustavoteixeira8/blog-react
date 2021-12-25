import React from 'react';
import { Switch } from 'react-router-dom';
import { MyRoute } from './MyRoute';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { SendEmailVerification } from '../pages/SendEmailVerification';
import { SendForgotPasswordEmail } from '../pages/SendForgotPasswordEmail';

export const AppRoutes = () => {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} />
      <MyRoute exact path="/login" component={Login} onlyNotLoggedIn={true} />
      <MyRoute exact path="/register" component={Register} onlyLoggedIn={true} />
      <MyRoute path="/email/verify" component={SendEmailVerification} />
      <MyRoute path="/password/forgot" component={SendForgotPasswordEmail} />
      <MyRoute path="*" component={NotFound} />
    </Switch>
  );
};
