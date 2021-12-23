import React from 'react';
import { Title } from './styled';
import { toast } from 'react-toastify';

export const Login = () => {
  toast.success('oi');
  toast.info('oi info', { containerId: '1' });

  return <Title>Login</Title>;
};
