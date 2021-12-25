import React, { useState } from 'react';
import { Container } from '../../styles/globalStyles';
import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { Title } from './styled';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { browserHistory } from '../../services/browserHistory';

export const SendForgotPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email must be provided');
      return;
    }

    try {
      setIsLoading(true);
      await axios.post('/auth/password/forgot', { email });

      setIsLoading(false);
      toast.success(
        'If the email exists in the database and is not verified, you will receive an email',
      );

      browserHistory.push('/login');
    } catch (error) {
      toast.error('Internal error, try again later');
    } finally {
      setIsLoading(false);
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

        <Form onSubmit={handleSubmit}>
          <label htmlFor="login">
            Email
            <input
              name="email"
              placeholder="Type your email"
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
};
