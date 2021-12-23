import React from 'react';
import { Container } from '../../styles/globalStyles';
import { Title } from './styled';

export const NotFound = () => {
  return (
    <Container>
      <Title>
        404
        <p>Page not found</p>
      </Title>
    </Container>
  );
};
