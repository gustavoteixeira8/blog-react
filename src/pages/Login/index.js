import React, { useState } from 'react';
import { get } from 'lodash';
import { Title } from '../../components/Title';
import { Form } from '../../components/Form';
import * as authActions from '../../store/modules/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../styles/globalStyles';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import { Loading } from '../../components/Loading';
import { Link } from 'react-router-dom';
import { HelmetTags } from '../../components/Helmet';

export const Login = (props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');
  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!login || !password) {
      toast.error('Login and password must be provided');
      return;
    }

    dispatch(authActions.createLoginRequest({ login, password, prevPath, isLoading: true }));
  };

  return (
    <>
      <HelmetTags title="Login" />

      <Loading isLoading={isLoading} />
      <Container style={{ maxWidth: '800px' }}>
        <Title>Login</Title>

        <Form onSubmit={handleSubmit}>
          <label htmlFor="login">
            Email or username
            <input
              name="login"
              placeholder="Type your username or email"
              type="text"
              autoFocus
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small>
              <Link to="/password/forgot" title="Forgot password">
                Forgot password
              </Link>
              <span className="divisor">|</span>
              <Link to="/email/verify" title="Verify email">
                Verify email
              </Link>
            </small>
          </label>

          <Button type="submit">LOGIN</Button>
        </Form>
      </Container>
    </>
  );
};
