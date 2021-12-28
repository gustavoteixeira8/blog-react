import React from 'react';
import { Switch } from 'react-router-dom';
import { MyRoute } from './MyRoute';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { EmailVerification } from '../pages/EmailVerification';
import { UpdatePassword } from '../pages/UpdatePassword';
import { UserLoggedInAccount } from '../pages/UserLoggedInAccount';

export const AppRoutes = () => {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} />
      <MyRoute exact path="/login" component={Login} onlyNotLoggedIn={true} />
      <MyRoute exact path="/register" component={Register} onlyLoggedIn={true} />
      <MyRoute exact path="/email/verify" component={EmailVerification} />
      <MyRoute exact path="/password/forgot" component={UpdatePassword} />
      <MyRoute exact path="/account" component={UserLoggedInAccount} onlyLoggedIn={true} />
      <MyRoute path="*" component={NotFound} />
    </Switch>
  );
};
