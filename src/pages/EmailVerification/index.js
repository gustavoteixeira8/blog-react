import React, { useState } from 'react';
import { Container } from '../../styles/globalStyles';
import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { Title } from '../../components/Title';
import { browserHistory } from '../../services/browserHistory';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/modules/user/actions';
import { get } from 'lodash';

export const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email must be provided');
      return;
    }

    try {
      setIsLoading(true);
      await axios.post('/auth/email/verify', { email });

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

  const handleSubmitToken = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('Token must be provided');
      return;
    }

    try {
      setIsLoading(true);
      await axios.put(`/auth/email/verify/${token}`);

      toast.success('Email verified successfully');

      browserHistory.push('/login');

      if (isLoggedIn) {
        dispatch(userActions.createFetchUserLoggedInRequest());
      }
    } catch (error) {
      const errors = get(error, 'response.data.body.errors', ['Internal error, try again later']);
      errors.map((err) => toast.error(err, { toastId: Math.random() }));
      setIsLoading(false);
      setToken('');
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container>
        <Title>
          Email verification
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
          <Form onSubmit={handleSubmitToken}>
            <label htmlFor="token">
              Token
              <input
                name="token"
                placeholder="Enter the token received by email"
                type="text"
                autoFocus
                value={token}
                autoSave="false"
                onChange={(e) => setToken(e.target.value)}
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
