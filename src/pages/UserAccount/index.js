import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Container } from '../../styles/globalStyles';
import { Title } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading';
import { formatDate } from '../../utils/formatDate';
import * as authActions from '../../store/modules/auth/actions';
import * as userActions from '../../store/modules/user/actions';
import { validateEmail, validateFullName, validateUsername } from '../../validations/index';
import { toast } from 'react-toastify';

export const UserAccount = () => {
  const { data } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    if (!data || !Object.keys(data).length) {
      dispatch(authActions.createLogoutRequest());
      return;
    }

    setFullName(data.fullName);
    setEmail(data.email);
    setUsername(data.username);
    setIsAdmin(data.isAdmin);
    setIsEmailVerified(data.isEmailVerified);
    setUpdatedAt(data.updatedAt);
  }, [data, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { fullName, email, username };

    const validators = [
      validateFullName(fullName),
      validateEmail(email),
      validateUsername(username),
    ];
    const isInvalidUser = validators.map((validator) => validator.isValid).includes(false);

    if (isInvalidUser) {
      validators.map(({ message }) => toast.error(message, { toastId: Math.random() }));
      return;
    }

    dispatch(userActions.createUpdateUserLoggedInRequest({ user }));
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container>
        <Title>Account</Title>

        <Form onSubmit={handleSubmit}>
          <label htmlFor="fullName">
            Full name
            <input
              name="fullName"
              placeholder="Full name"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="username">
            Username
            <input
              name="username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label htmlFor="isEmailVerified">
            My email is verified ?
            <input
              name="email"
              placeholder=""
              type="text"
              disabled
              value={isEmailVerified ? 'YES' : 'NO'}
            />
          </label>

          <label htmlFor="email">
            Am I an admin ?
            <input
              name="isAdmin"
              placeholder=""
              type="text"
              disabled
              value={isAdmin ? 'YES' : 'NO'}
            />
          </label>

          <label htmlFor="lastUpdate">
            Last update
            <input
              name="lastUpdate"
              placeholder=""
              type="text"
              disabled
              value={updatedAt && formatDate(updatedAt)}
            />
            <small>
              <Link to="/password/forgot" title="Forgot password">
                Update password
              </Link>
              <span className="divisor">|</span>
              <Link to="/email/verify" title="Verify email">
                Verify email
              </Link>
            </small>
          </label>

          <Button type="submit">Update my account</Button>
        </Form>
      </Container>
    </>
  );
};
