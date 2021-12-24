import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { browserHistory } from '../../services/browserHistory';
import { Title, Form } from './styled';
import { Container } from '../../styles/globalStyles';
import { User } from '../../models/User';
import { Button } from '../../components/Button';
import { randomId } from '../../utils/randomId';
import { Loading } from '../../components/Loading';

export const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const userOrError = User.create({ fullName, email, password, username });

      if (Array.isArray(userOrError)) {
        userOrError.map((error) => toast.error(error, { toastId: randomId() }));
        return;
      }

      const { data } = await axios.post('/user', userOrError);

      browserHistory.push('/');
      toast.success(data.body.message, { toastId: randomId() });
    } catch (error) {
      const errors = error.response.data.body.errors;
      const statusCode = error.response.status;

      if (statusCode >= 400 && statusCode <= 499) {
        errors.map((error) => toast.error(error, { toastId: randomId() }));
        return;
      }

      toast.error('Internal error, try again later', { toastId: randomId() });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container style={{ maxWidth: '800px' }}>
        <Title>Register</Title>

        <Form onSubmit={handleSubmit}>
          <label htmlFor="fullName">
            Full name
            <input
              name="fullName"
              placeholder="Full name"
              type="text"
              autoFocus
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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

          <label htmlFor="password">
            Password
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <Button type="submit">Register an account</Button>
        </Form>
      </Container>
    </>
  );
};
