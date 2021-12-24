import React from 'react';
import PropType from 'prop-types';
import { Container } from './styled';

export const Loading = ({ isLoading }) => {
  if (!isLoading) return <></>;

  return (
    <Container>
      <span>Loading ...</span>
    </Container>
  );
};

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropType.bool,
};
