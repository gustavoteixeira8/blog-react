import React from 'react';
import { Container } from '../../styles/globalStyles';
import { Title } from '../../components/Title';

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
