import React from 'react';
import PropType from 'prop-types';
import { Container } from './styled';
import ReactLoading from 'react-loading';

export const Loading = ({ isLoading }) => {
  if (!isLoading) return <></>;

  return (
    <Container>
      <p>Loading</p>
      <ReactLoading type="bars" />
    </Container>
  );
};

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropType.bool,
};
