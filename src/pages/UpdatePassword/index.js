import React, { useState } from 'react';
import { Container } from '../../styles/globalStyles';
import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { Title } from './styled';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { validatePassword } from '../../validations';
import { browserHistory } from '../../services/browserHistory';
import { useDispatch } from 'react-redux';
import * as authAction from '../../store/modules/auth/actions';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const UpdatePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email must be provided');
      return;
    }

    try {
      setIsLoading(true);

      await axios.post('/auth/password/forgot', { email });

      setIsSuccess(true);

      toast.success(
        'If the email exists in the database and is not verified, you will receive an email',
      );
    } catch (error) {
      toast.error('Internal error, try again later');
    } finally {
      setIsLoading(false);
      setEmail('');
    }
  };

  const handleSubmitUpdatePassword = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('Token must be provided');
      return;
    }

    if (!password || !confirmPassword) {
      toast.error('Password and confirm password must be provided');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password and confirm password must be equals');
      return;
    }

    const isValidPassword = validatePassword(password);

    if (!isValidPassword) {
      toast.error(
        'Password must have at least 8 characters between uppercase, lowercase, symbols and numbers',
      );
    }

    try {
      setIsLoading(true);

      await axios.put(`/auth/password/recover/${token}`, { password, confirmPassword });

      toast.success('Password updated successfully');

      dispatch(authAction.createLogoutRequest());

      browserHistory.push('/');
    } catch (error) {
      const errors = error.response.data.body.errors;
      errors.map((err) => toast.error(err, { toastId: Math.random() }));
      setIsLoading(false);
      setPassword('');
      setConfirmPassword('');
      setToken('');
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container>
        <Title>
          Forgot password
          <span className="border-title"></span>
        </Title>

        {!isSuccess ? (
          <Form onSubmit={handleSubmitEmail}>
            <label htmlFor="email">
              Email
              <input
                name="email"
                placeholder="Enter your registered email"
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small>
                <p onClick={() => setIsSuccess(true)}>
                  <FaArrowRight fontSize={17} />
                </p>
              </small>
            </label>

            <Button type="submit">Submit</Button>
          </Form>
        ) : (
          <Form onSubmit={handleSubmitUpdatePassword}>
            <label htmlFor="token">
              Token
              <input
                name="token"
                placeholder="Enter the token received by email"
                type="text"
                autoFocus
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                name="password"
                placeholder="Enter a new password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                name="confirmPassword"
                placeholder="Repeat password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <small>
                <p onClick={() => setIsSuccess(false)}>
                  <FaArrowLeft fontSize={17} />
                </p>
              </small>
            </label>

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Container>
    </>
  );
};
