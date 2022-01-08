import React from 'react';
import { Switch } from 'react-router-dom';
import { MyRoute } from './MyRoute';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { EmailVerification } from '../pages/EmailVerification';
import { UpdatePassword } from '../pages/UpdatePassword';
import { UserAccount } from '../pages/UserAccount';
import { Dashboard } from '../pages/Dashboard';
import { DeleteAccount } from '../pages/DeleteAccount';
import { Categories } from '../pages/Categories';
import { CreateCategory } from '../pages/CreateCategory';
import { UpdateAndDeleteCategory } from '../pages/UpdateAndDeleteCategory';
import { ViewAllAccounts } from '../pages/ViewAllAccounts';
import { AddOrRemovePermission } from '../pages/AddOrRemovePermission';
import { CreateArticle } from '../pages/CreateArticle';
import { ListArticlesForCreator } from '../pages/ListArticlesForCreator';
import { UpdateArticle } from '../pages/UpdateArticle';
import { DeleteArticle } from '../pages/DeleteArticle';
import { RecoverArticle } from '../pages/RecoverArticle';
import { Article } from '../pages/Article';

export const AppRoutes = () => {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} />
      <MyRoute exact path="/login" component={Login} onlyNotLoggedIn={true} />
      <MyRoute exact path="/register" component={Register} onlyLoggedIn={true} onlyAdmin={true} />
      <MyRoute exact path="/email/verify" component={EmailVerification} />
      <MyRoute exact path="/password/forgot" component={UpdatePassword} />
      <MyRoute exact path="/account" component={UserAccount} onlyLoggedIn={true} />
      <MyRoute exact path="/account/delete" component={DeleteAccount} onlyLoggedIn={true} />
      <MyRoute exact path="/dashboard" component={Dashboard} onlyLoggedIn={true} onlyAdmin={true} />
      <MyRoute exact path="/category" component={Categories} onlyLoggedIn={true} onlyAdmin={true} />
      <MyRoute
        exact
        path="/account/permission/:username"
        component={AddOrRemovePermission}
        onlyLoggedIn={true}
        onlyAdmin={true}
      />
      <MyRoute
        exact
        path="/account/all"
        component={ViewAllAccounts}
        onlyLoggedIn={true}
        onlyAdmin={true}
      />
      <MyRoute
        exact
        path="/category/update/:categorySlug"
        component={UpdateAndDeleteCategory}
        onlyLoggedIn={true}
        onlyAdmin={true}
      />
      <MyRoute
        exact
        path="/category/new"
        component={CreateCategory}
        onlyLoggedIn={true}
        onlyAdmin={true}
      />
      <MyRoute
        exact
        path="/article/update/:articleSlug"
        component={UpdateArticle}
        onlyLoggedIn={true}
        onlyAdmin={true}
      />
      <MyRoute
        exact
        path="/article/delete/:articleSlug"
        component={DeleteArticle}
        onlyLoggedIn={true}
        onlyAdmin={true}
      />
      <MyRoute
        exact
        path="/article/recover/:articleSlug"
        component={RecoverArticle}
        onlyLoggedIn={true}
        onlyAdmin={true}
      />
      <MyRoute
        exact
        path="/article/new"
        component={CreateArticle}
        onlyLoggedIn={true}
        onlyAdmin={true}
      />
      <MyRoute exact path="/article/:articleSlug" component={Article} />
      <MyRoute
        exact
        path="/my/article"
        component={ListArticlesForCreator}
        onlyLoggedIn={true}
        onlyAdmin={true}
      />

      <MyRoute path="*" component={NotFound} />
    </Switch>
  );
};
