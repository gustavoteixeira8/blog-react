import React from 'react';
import { Container } from '../../styles/globalStyles';
import { Title } from '../../components/Title';
import { HelmetTags } from '../../components/Helmet';

export const NotFound = () => {
  return (
    <>
      <HelmetTags title="Page not found" />

      <Container>
        <Title style={{ margin: 0 }}>
          404
          <p>Page not found</p>
        </Title>
      </Container>
    </>
  );
};
